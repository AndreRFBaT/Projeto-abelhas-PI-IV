import asyncio
import httpx
import random
from datetime import datetime
from app.db import SessionLocal

INTERVAL = 5  # segundos

async def simulate_data():
    # url = "http://localhost:8000/api/ingest"
    API_URL = "http://127.0.0.1:8000/api/data/ingest"

    while True:
        payload = {
            "temperatura": round(random.uniform(15, 40), 2),
            "umidade": round(random.uniform(30, 90), 2),
            "poluicao": round(random.uniform(10, 80), 2),
            "abelhas_ativas": random.randint(0, 1000),
            "timestamp": datetime.now().isoformat()
        }
        async with httpx.AsyncClient() as client:
            try:
                await client.post(API_URL, json=payload)
                print("Dado enviado:", payload)
            except Exception as e:
                print("Falha ao enviar:", e)
        await asyncio.sleep(INTERVAL)
