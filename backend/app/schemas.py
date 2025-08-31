from typing import Optional, List, Dict
from pydantic import BaseModel, Field
from datetime import datetime

class BeeRecordCreate(BaseModel):
    temperatura: float
    umidade: float
    poluicao: float
    abelhas_ativas: int
    # timestamp opcional (se não vier, servidor usa now)
    timestamp: Optional[datetime] = None

class BeeRecordRead(BaseModel):
    id: int
    timestamp: datetime
    temperatura: float
    umidade: float
    poluicao: float
    abelhas_ativas: int
    atividade_alta: int
    atividade: str

    class Config:
        from_attributes = True

class PredictionRequest(BaseModel):
    temperatura: float
    umidade: float
    poluicao: float

class PredictionResponse(BaseModel):
    predicted_label: str
    predicted_class: int
    proba_alta: float = Field(..., description="Probabilidade prevista para classe Alta (1)")

class TrainMetrics(BaseModel):
    accuracy: float
    confusion_matrix: List[List[int]]
    classification_report: Dict[str, Dict[str, float]]

class StatsResponse(BaseModel):
    total: int
    altas: int
    baixas: int