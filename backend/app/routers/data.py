"""
data.py
=======

Defines FastAPI routes for handling bee sensor data, model predictions, training, statistics, and noise simulation.
Interacts with the database and the model manager to provide API endpoints for the frontend.

Main Components
---------------

- API Router: Prefix /api/data, tag 'data'.
- Endpoints:
    - POST /predicao: Predicts bee activity using the trained model and input features.
    - POST /train: Trains the machine learning model with current database data.
    - GET /dados: Returns a list of bee sensor records from the database.
    - GET /stats: Returns statistics about bee activity (total, high, low).
    - POST /ingest: Simulates and ingests a new bee sensor record into the database.
    - GET /noise: Simulates and returns the current noise level in the hive.
- Models:
    - PredInput: Pydantic model for prediction input (temperature, humidity, pollution).

Usage
-----

Import and include this router in your FastAPI app to expose bee data endpoints.

Dependencies
------------

FastAPI, SQLAlchemy, random, datetime, pydantic, app.db, app.models, app.model_manager
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder
from ..db import get_db
from ..models import BeeRecord
from ..model_manager import model_manager
from datetime import datetime
import random
from typing import List
from pydantic import BaseModel

# router = APIRouter()


router = APIRouter(prefix="/api/data", tags=["data"])

class PredInput(BaseModel):
    temperatura: float
    umidade: float
    poluicao: float

@router.post("/predicao")
async def predicao(data: PredInput, db: Session = Depends(get_db)):
    resultado = model_manager.predict(
        db,
        temperatura=data.temperatura,
        umidade=data.umidade,
        poluicao=data.poluicao
    )
    return resultado

@router.post("/train")
async def treinar_modelo(db: Session = Depends(get_db)):
    try:
        metrics = model_manager.train(db)
        return {"ok": True, "metrics": metrics}
    except ValueError as e:
        return {"ok": False, "error": str(e)}

@router.get("/dados")
async def get_dados(limit: int = 100, db: Session = Depends(get_db)):
    dados = db.query(BeeRecord).order_by(BeeRecord.timestamp.desc()).limit(limit).all()
    return jsonable_encoder(dados)

@router.get("/stats")
async def get_stats(db: Session = Depends(get_db)):
    total = db.query(BeeRecord).count()
    altas = db.query(BeeRecord).filter(BeeRecord.atividade_alta == 1).count()
    baixas = total - altas
    return {"total": total, "altas": altas, "baixas": baixas}

@router.post("/ingest")
async def ingest_data(db: Session = Depends(get_db)):
    temperatura = round(random.uniform(15, 40), 2)
    umidade = round(random.uniform(30, 90), 2)
    poluicao = round(random.uniform(10, 80), 2)
    abelhas_ativas = random.randint(100, 1000)

    atividade = "alta" if abelhas_ativas > 500 else "baixa"
    atividade_alta = 1 if abelhas_ativas > 500 else 0

    ruido_db = round(random.uniform(20, 120), 2)
    status_ruido = "normal"
    if ruido_db > 80:
        status_ruido = "alerta: possível agitação!"
    elif ruido_db > 60:
        status_ruido = "moderado: atenção"

    novo_dado = BeeRecord(
        temperatura=temperatura,
        umidade=umidade,
        poluicao=poluicao,
        abelhas_ativas=abelhas_ativas,
        atividade=atividade,
        atividade_alta=atividade_alta,
        ruido_db=ruido_db,
        status_ruido=status_ruido,
    )

    db.add(novo_dado)
    db.commit()
    db.refresh(novo_dado)

    return {"ok": True, "data": jsonable_encoder(novo_dado)}


# app/routers/noise.py
@router.get("/noise")
def get_noise_level():
    """
    Simula o nível de ruído dentro da colmeia.
    Retorna valores de 20 a 120 dB.
    """
    noise_level = random.randint(20, 120)  # em decibéis
    # timestamp = datetime.datetime.now().isoformat()
    timestamp = datetime.now().isoformat()
    status = "normal"

    if noise_level > 80:
        status = "alerta: possível agitação!"
    elif noise_level > 60:
        status = "moderado: atenção"

    return {
        "timestamp": timestamp,
        "noise_db": noise_level,
        "status": status
    }

