import os
import joblib
import numpy as np
import pandas as pd
from typing import Optional
from sqlalchemy.orm import Session
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, f1_score, roc_auc_score
from .models import BeeRecord
from statsmodels.tsa.arima.model import ARIMA

MODEL_PATH = os.getenv("MODEL_PATH", "./model.pkl")

class ModelManager:
    def __init__(self):
        self.model: Optional[RandomForestClassifier] = None
        self.metrics: Optional[dict] = None
        self._last_train_count: int = 0
        self._load()

    def _load(self):
        if os.path.exists(MODEL_PATH):
            try:
                self.model = joblib.load(MODEL_PATH)
            except Exception:
                self.model = None

    def _save(self):
        if self.model is not None:
            joblib.dump(self.model, MODEL_PATH)

    def _fetch_df(self, db: Session, limit: Optional[int] = None) -> pd.DataFrame:
        q = db.query(BeeRecord).order_by(BeeRecord.timestamp.asc())
        if limit:
            q = q.limit(limit)
        rows = q.all()
        if not rows:
            return pd.DataFrame(columns=["temperatura", "umidade", "poluicao", "abelhas_ativas",
                                         "atividade_alta", "ruido_db", "timestamp"])
        data = [{
            "temperatura": r.temperatura,
            "umidade": r.umidade,
            "poluicao": r.poluicao,
            "abelhas_ativas": r.abelhas_ativas,
            "atividade_alta": r.atividade_alta,
            "ruido_db": r.ruido_db,
            "timestamp": r.timestamp
        } for r in rows]

        df = pd.DataFrame(data)
        df['timestamp'] = pd.to_datetime(df['timestamp'])

        # Diferenças
        df['delta_abelhas'] = df['abelhas_ativas'].diff().fillna(0)
        df['delta_temperatura'] = df['temperatura'].diff().fillna(0)
        df['delta_umidade'] = df['umidade'].diff().fillna(0)
        df['delta_poluicao'] = df['poluicao'].diff().fillna(0)
        df['delta_ruido'] = df['ruido_db'].diff().fillna(0)

        # Médias móveis
        df['media_movel_3'] = df['abelhas_ativas'].rolling(3, min_periods=1).mean()
        df['media_movel_5'] = df['abelhas_ativas'].rolling(5, min_periods=1).mean()
        df['media_movel_10'] = df['abelhas_ativas'].rolling(10, min_periods=1).mean()

        # Interações
        df['indice_estresse'] = df['temperatura'] * df['poluicao']
        df['temp_umidade'] = df['temperatura'] * df['umidade']
        df['poluicao_ruido'] = df['poluicao'] * df['ruido_db']

        # Features temporais
        df['hora'] = df['timestamp'].dt.hour
        df['dia_semana'] = df['timestamp'].dt.dayofweek

        return df

    def train(self, db: Session, limit: Optional[int] = None):
        df = self._fetch_df(db, limit)
        if len(df) < 20:
            raise ValueError("Poucos dados no banco para treinar (mín. 20). Rode o simulador para popular.")

        # Features completas
        feature_cols = ["temperatura","umidade","poluicao","ruido_db",
                        "delta_abelhas","media_movel_3","media_movel_5","media_movel_10",
                        "indice_estresse","delta_temperatura","delta_umidade","delta_poluicao","delta_ruido"]

        X = df[feature_cols]
        y = df["atividade_alta"]

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        model = RandomForestClassifier(n_estimators=200, random_state=42)
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)

        # Métricas
        acc = accuracy_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred)
        auc = roc_auc_score(y_test, y_pred)
        cm = confusion_matrix(y_test, y_pred).tolist()
        report = classification_report(y_test, y_pred, output_dict=True)

        # Validação cruzada
        cv_scores = cross_val_score(model, X, y, cv=5)

        self.model = model
        self._save()
        self._last_train_count = len(df)

        self.metrics = {
            "accuracy": float(acc),
            "f1_score": float(f1),
            "auc": float(auc),
            "confusion_matrix": cm,
            "classification_report": report,
            "cross_val_mean": float(cv_scores.mean()),
            "feature_importance": dict(zip(feature_cols, model.feature_importances_.tolist()))
        }

        return self.metrics

    def ensure_model(self, db: Session, retrain_threshold: int = 50):
        if self.model is None:
            self.train(db)
        else:
            df = self._fetch_df(db)
            if len(df) - self._last_train_count >= retrain_threshold:
                self.train(db)
        return self.model

    def predict(self, db: Session, temperatura: float, umidade: float, poluicao: float, ruido_db: float):
        # Pega o último registro do banco
        df_hist = self._fetch_df(db, limit=1)
        last_row = df_hist.iloc[-1] if not df_hist.empty else {
            "abelhas_ativas": 50,
            "temperatura": temperatura,
            "umidade": umidade,
            "poluicao": poluicao,
            "ruido_db": ruido_db,
            "media_movel_3": 50,
            "media_movel_5": 50,
            "media_movel_10": 50
        }

        # Calcula features derivadas
        delta_abelhas = 0
        media_movel_3 = last_row.get('media_movel_3', last_row['abelhas_ativas'])
        media_movel_5 = last_row.get('media_movel_5', last_row['abelhas_ativas'])
        media_movel_10 = last_row.get('media_movel_10', last_row['abelhas_ativas'])
        indice_estresse = temperatura * poluicao
        delta_temperatura = temperatura - last_row['temperatura']
        delta_umidade = umidade - last_row['umidade']
        delta_poluicao = poluicao - last_row['poluicao']
        delta_ruido = ruido_db - last_row['ruido_db']

        # Monta o array com todas as 13 features
        X = np.array([[
            temperatura, umidade, poluicao, ruido_db,
            delta_abelhas, media_movel_3, media_movel_5, media_movel_10,
            indice_estresse, delta_temperatura, delta_umidade, delta_poluicao, delta_ruido
        ]])

        # Garante que o modelo está treinado
        model = self.ensure_model(db)
        
        # Predição
        pred_class = int(model.predict(X)[0])
        proba = float(model.predict_proba(X)[0][1]) if hasattr(model, "predict_proba") else 0.0
        label = "Alta" if pred_class == 1 else "Baixa"

        return {"predicted_label": label, "predicted_class": pred_class, "proba_alta": proba}


    def forecast(self, db: Session, steps: int = 5):
        df = self._fetch_df(db)
        if len(df) < 20:
            return {"error": "Poucos dados para previsão"}
        series = df["abelhas_ativas"]
        try:
            model = ARIMA(series, order=(2,1,2))
            fitted = model.fit()
            forecast = fitted.forecast(steps=steps).tolist()
            return {"forecast": forecast}
        except Exception as e:
            return {"error": str(e)}

# Instância global
model_manager = ModelManager()
