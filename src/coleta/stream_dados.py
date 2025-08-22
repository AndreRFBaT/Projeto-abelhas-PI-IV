import pandas as pd
import numpy as np
import os
import time
from datetime import datetime

# Caminho do CSV
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATA_PATH = os.path.join(BASE_DIR, "data", "abelhas.csv")

def gerar_dado_unico():
    """Gera uma nova linha simulando dados de um sensor"""
    temperatura = np.random.uniform(15, 40)
    umidade = np.random.uniform(30, 90)
    poluicao = np.random.uniform(10, 80)
    abelhas_ativas = np.random.randint(100, 1000)
    atividade_alta = int(abelhas_ativas > 500)
    atividade = "Alta" if atividade_alta == 1 else "Baixa"
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    return {
        "timestamp": timestamp,
        "temperatura": temperatura,
        "umidade": umidade,
        "poluicao": poluicao,
        "abelhas_ativas": abelhas_ativas,
        "atividade_alta": atividade_alta,
        "atividade": atividade
    }

def simular_fluxo(intervalo_segundos=1):
    print(f"⏳ Iniciando simulação contínua. Salvando em: {DATA_PATH}")
    os.makedirs(os.path.dirname(DATA_PATH), exist_ok=True)

    # Se o arquivo ainda não existir, cria com cabeçalho
    if not os.path.exists(DATA_PATH):
        pd.DataFrame(columns=["timestamp", "temperatura", "umidade", "poluicao", 
                              "abelhas_ativas", "atividade_alta", "atividade"]).to_csv(DATA_PATH, index=False)

    MAX_LINHAS = 500  # número máximo de linhas que queremos manter no CSV

    while True:
        novo_dado = gerar_dado_unico()
        df_novo = pd.DataFrame([novo_dado])

        # Carrega os dados atuais
        if os.path.exists(DATA_PATH):
            df_existente = pd.read_csv(DATA_PATH)
            df_concat = pd.concat([df_existente, df_novo], ignore_index=True)

            # Mantém apenas as últimas MAX_LINHAS linhas
            df_concat = df_concat.tail(MAX_LINHAS)
        else:
            df_concat = df_novo

        # Salva o arquivo atualizado
        df_concat.to_csv(DATA_PATH, index=False)

        print(f"✅ Novo dado adicionado em {novo_dado['timestamp']}")
        time.sleep(intervalo_segundos)

if __name__ == "__main__":
    simular_fluxo(intervalo_segundos=1)
