"""
model_manager_routers.py
=======================

Defines FastAPI routes for machine learning operations, including model training and prediction, for the Abelhas IoT+ML backend.

Main Components
---------------

- API Router: Prefix /api, tag 'ml'.
- Endpoints:
    - POST /treinar: Trains the machine learning model with current database data. Returns training metrics.
    - POST /predicao: Predicts bee activity (high/low) based on input features (temperature, humidity, pollution, noise). Returns prediction results.
- Dependencies:
    - Uses get_db for database session management.
    - Uses Pydantic schemas for request and response validation.

Usage
-----

Import and include this router in your FastAPI app to expose ML endpoints.

Dependencies
------------

FastAPI, SQLAlchemy, app.db, app.schemas, app.model_manager
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db import get_db
from ..schemas import PredictionRequest, PredictionResponse, TrainMetrics
from ..model_manager import model_manager

router = APIRouter(prefix="/api", tags=["ml"])

@router.post("/treinar", response_model=TrainMetrics)
def treinar(db: Session = Depends(get_db)):
    """Treina o modelo de Machine Learning com os dados atuais do banco.
    """
    try:
        metrics = model_manager.train(db)
        return metrics
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@router.post("/predicao", response_model=PredictionResponse)
def predicao(body: PredictionRequest, db: Session = Depends(get_db)):
    """Retorna a predição de atividade alta/baixa das abelhas com base em:
    temperatura, umidade, poluição e ruído.
    """
    try:
        res = model_manager.predict(
            db,
            temperatura=body.temperatura,
            umidade=body.umidade,
            poluicao=body.poluicao,
            ruido_db=getattr(body, "ruido_db", 50)  # valor default se não vier
        )
        return res
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")
