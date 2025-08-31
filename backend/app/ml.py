import os
import joblib
import numpy as np
import pandas as pd
from typing import Optional
from sqlalchemy.orm import Session
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from .models import BeeRecord

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
        q = db.query(BeeRecord).order_by(BeeRecord.timestamp.desc())
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
        return df

    def train(self, db: Session, limit: Optional[int] = None):
        df = self._fetch_df(db, limit)
        if len(df) < 20:
            raise ValueError("Poucos dados no banco para treinar (mín. 20). Rode o simulador para popular.")
        X = df[["temperatura", "umidade", "poluicao"]]
        y = df["atividade_alta"]
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        model = RandomForestClassifier(n_estimators=120, random_state=42)
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        acc = accuracy_score(y_test, y_pred)
        cm = confusion_matrix(y_test, y_pred).tolist()
        report = classification_report(y_test, y_pred, output_dict=True)
        self.model = model
        self._save()
        self.metrics = {"accuracy": float(acc), "confusion_matrix": cm, "classification_report": report}
        return self.metrics

    def ensure_model(self, db: Session):
        if self.model is None:
            # tenta treinar com o que houver
            self.train(db)
        return self.model

    def predict(self, db: Session, temperatura: float, umidade: float, poluicao: float):
        model = self.ensure_model(db)
        X = np.array([[temperatura, umidade, poluicao]])
        pred_class = int(model.predict(X)[0])
        if hasattr(model, "predict_proba"):
            proba = float(model.predict_proba(X)[0][1])
        else:
            proba = 0.0
        label = "Alta" if pred_class == 1 else "Baixa"
        return {"predicted_label": label, "predicted_class": pred_class, "proba_alta": proba}

model_manager = ModelManager()