from fastapi import APIRouter
from datetime import datetime
import random
from pydantic import BaseModel
from typing import List

# router = APIRouter(prefix="/api/data", tags=["data"])

# # router = APIRouter(prefix="/api", tags=["data"])
# router = APIRouter(prefix="/api", tags=["ml"])
router = APIRouter(prefix="/api/data", tags=["data"])

# Lista global para armazenar os dados gerados
dados_armazenados: List[dict] = []

class PredInput(BaseModel):
    temperatura: float
    umidade: float
    poluicao: float

@router.post("/predicao")
async def predicao(data: PredInput):
    # Simulação de predição
    pred = random.choice(["alta", "baixa"])
    proba_alta = random.random()
    return {"predicted_label": pred, "proba_alta": proba_alta}

# GET /api/dados
# @router.get("/dados")
# async def get_dados(limit: int = 100):
#     # Aqui você deve buscar do banco de dados, mas para teste:
#     sample_data = [
#         {
#             "id": i,
#             "timestamp": datetime.utcnow().isoformat(),
#             "temperatura": 20 + i*0.1,
#             "umidade": 50 + i*0.1,
#             "poluicao": 30 + i*0.1,
#             "abelhas_ativas": 100 + i,
#             "atividade_alta": 0,
#             "atividade": "baixa"
#         }
#         for i in range(limit)
#     ]
#     return sample_data
@router.get("/dados")
async def get_dados(limit: int = 100):
    # sample_data = [
        # {
        #     "id": i,
        #     "timestamp": datetime.utcnow().isoformat(),
        #     "temperatura": round(random.uniform(15, 40), 2),
        #     "umidade": round(random.uniform(30, 90), 2),
        #     "poluicao": round(random.uniform(10, 80), 2),
        #     "abelhas_ativas": random.randint(100, 1000),
        #     "atividade_alta": 0,
        #     "atividade": "baixa"
        # }
        # for i in range(limit)
    # ]
    return dados_armazenados[-limit:]


# GET /api/stats
# @router.get("/stats")
# async def get_stats():
#     # Simulação de estatísticas
#     return {"total": 1000, "altas": 400, "baixas": 600}

# GET /api/stats
@router.get("/stats")
async def get_stats():
    total = len(dados_armazenados)
    altas = sum(d["atividade_alta"] for d in dados_armazenados)
    baixas = total - altas
    return {"total": total, "altas": altas, "baixas": baixas}


@router.post("/ingest")
async def ingest_data():
    temperatura = round(random.uniform(15, 40), 2)
    umidade = round(random.uniform(30, 90), 2)
    poluicao = round(random.uniform(10, 80), 2)
    abelhas_ativas = random.randint(100, 1000)

    dado = {
        "temperatura": temperatura,
        "umidade": umidade,
        "poluicao": poluicao,
        "abelhas_ativas": abelhas_ativas,
        "timestamp": datetime.utcnow().isoformat(),
        "atividade": "alta" if abelhas_ativas > 500 else "baixa",
        "atividade_alta": 1 if abelhas_ativas > 500 else 0
    }
    dados_armazenados.append(dado)

    return {"ok": True, "data": dado}
