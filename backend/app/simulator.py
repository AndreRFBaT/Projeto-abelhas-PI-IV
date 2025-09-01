import asyncio
import httpx
import random
from datetime import datetime
from .db import SessionLocal

INTERVAL = 5  # segundos

async def simulate_data():
    API_URL = "http://127.0.0.1:8001/api/data/ingest"

    while True:
        abelhas_ativas = random.randint(0, 1000)

        ruido_db = round(random.uniform(20, 120), 2)
        status_ruido = "normal"
        if ruido_db > 80:
            status_ruido = "alerta: possível agitação!"
        elif ruido_db > 60:
            status_ruido = "moderado: atenção"

        payload = {
            "temperatura": round(random.uniform(15, 40), 2),
            "umidade": round(random.uniform(30, 90), 2),
            "poluicao": round(random.uniform(10, 80), 2),
            "abelhas_ativas": abelhas_ativas,
            "atividade": "alta" if abelhas_ativas > 500 else "baixa",
            "atividade_alta": 1 if abelhas_ativas > 500 else 0,
            "ruido_db": ruido_db,
            "status_ruido": status_ruido,
            "timestamp": datetime.now().isoformat()
        }

        async with httpx.AsyncClient() as client:
            try:
                await client.post(API_URL, json=payload)
                print("Dado enviado:", payload)
            except Exception as e:
                print("Falha ao enviar:", e)

        await asyncio.sleep(INTERVAL)
