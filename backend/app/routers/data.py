from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder
from ..db import get_db
from ..models import BeeRecord
from ..ml import model_manager
from datetime import datetime
import random
from typing import List
from pydantic import BaseModel


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

    novo_dado = BeeRecord(
        temperatura=temperatura,
        umidade=umidade,
        poluicao=poluicao,
        abelhas_ativas=abelhas_ativas,
        atividade=atividade,
        atividade_alta=atividade_alta
    )

    db.add(novo_dado)
    db.commit()
    db.refresh(novo_dado)

    return {"ok": True, "data": jsonable_encoder(novo_dado)}
