import os
import time
import random
import requests
from datetime import datetime

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")
INTERVAL = float(os.getenv("INTERVAL", "1"))  # segundos

def gerar_dado_unico():
    temperatura = random.uniform(15, 40)
    umidade = random.uniform(30, 90)
    poluicao = random.uniform(10, 80)
    abelhas_ativas = random.randint(100, 1000)
    return {
        "temperatura": temperatura,
        "umidade": umidade,
        "poluicao": poluicao,
        "abelhas_ativas": abelhas_ativas,
        "timestamp": datetime.now().isoformat()
    }

if __name__ == "__main__":
    print(f"Publicando para {BACKEND_URL}/api/ingest a cada {INTERVAL}s…")
    while True:
        payload = gerar_dado_unico()
        try:
            r = requests.post(f"{BACKEND_URL}/api/ingest", json=payload, timeout=5)
            r.raise_for_status()
            print("✓ enviado:", payload)
        except Exception as e:
            print("Falha ao enviar:", e)
        time.sleep(INTERVAL)