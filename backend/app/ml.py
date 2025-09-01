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
            return pd.DataFrame(columns=["temperatura", "umidade", "poluicao", "abelhas_ativas", "atividade_alta"]) 
        data = [{
            "temperatura": r.temperatura,
            "umidade": r.umidade,
            "poluicao": r.poluicao,
            "abelhas_ativas": r.abelhas_ativas,
            "atividade_alta": r.atividade_alta,
        } for r in rows]
        df = pd.DataFrame(data)

        # novas features
        df["delta_abelhas"] = df["abelhas_ativas"].diff().fillna(0)
        df["media_movel_abelhas"] = df["abelhas_ativas"].rolling(window=5, min_periods=1).mean()
        df["indice_estresse"] = df["temperatura"] * df["poluicao"]

        return df

    def train(self, db: Session, limit: Optional[int] = None):
        df = self._fetch_df(db, limit)
        if len(df) < 20:
            raise ValueError("Poucos dados no banco para treinar (mín. 20). Rode o simulador para popular.")

        X = df[["temperatura", "umidade", "poluicao", "delta_abelhas", "media_movel_abelhas", "indice_estresse"]]
        y = df["atividade_alta"]

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        model = RandomForestClassifier(n_estimators=200, random_state=42)
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)

        # métricas adicionais
        acc = accuracy_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred)
        auc = roc_auc_score(y_test, y_pred)
        cm = confusion_matrix(y_test, y_pred).tolist()
        report = classification_report(y_test, y_pred, output_dict=True)

        # validação cruzada
        cv_scores = cross_val_score(model, X, y, cv=5)
        
        self.model = model
        self._save()
        self.metrics = {
            "accuracy": float(acc),
            "f1_score": float(f1),
            "auc": float(auc),
            "confusion_matrix": cm,
            "classification_report": report,
            "cross_val_mean": float(cv_scores.mean())
        }
        return self.metrics

    def ensure_model(self, db: Session):
        if self.model is None:
            self.train(db)
        return self.model

    def predict(self, db: Session, temperatura: float, umidade: float, poluicao: float):
        model = self.ensure_model(db)
        X = np.array([[temperatura, umidade, poluicao, 
                       0, temperatura, temperatura*poluicao]])  # delta=0, média=temperatura só placeholder
        pred_class = int(model.predict(X)[0])
        if hasattr(model, "predict_proba"):
            proba = float(model.predict_proba(X)[0][1])
        else:
            proba = 0.0
        label = "Alta" if pred_class == 1 else "Baixa"
        return {"predicted_label": label, "predicted_class": pred_class, "proba_alta": proba}

    def forecast(self, db: Session, steps: int = 5):
        """Previsão futura simples usando ARIMA sobre abelhas_ativas"""
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

model_manager = ModelManager()
