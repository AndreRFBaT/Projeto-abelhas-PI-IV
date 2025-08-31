from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db import get_db
from ..schemas import PredictionRequest, PredictionResponse, TrainMetrics
from ..ml import model_manager

router = APIRouter(prefix="/api", tags=["ml"])

@router.post("/treinar", response_model=TrainMetrics)
def treinar(db: Session = Depends(get_db)):
    try:
        metrics = model_manager.train(db)
        return metrics
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/predicao", response_model=PredictionResponse)
def predicao(body: PredictionRequest, db: Session = Depends(get_db)):
    try:
        res = model_manager.predict(db, body.temperatura, body.umidade, body.poluicao)
        return res
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))