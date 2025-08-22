import pandas as pd
import numpy as np
import os

def gerar_dados(n=200):
    np.random.seed(42)
    dados = {
        "temperatura": np.random.uniform(15, 40, n),     # °C
        "umidade": np.random.uniform(30, 90, n),         # %
        "poluicao": np.random.uniform(10, 80, n),        # índice fictício
        "abelhas_ativas": np.random.randint(100, 1000, n) # contagem
    }

    df = pd.DataFrame(dados)
    df["atividade_alta"] = (df["abelhas_ativas"] > 500).astype(int)  # 1 = alta atividade
    df["atividade"] = df["atividade_alta"].map({1: "Alta", 0: "Baixa"})

    return df

if __name__ == "__main__":
    df = gerar_dados()

    # Caminho correto a partir da raiz do projeto
    data_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "data")
    os.makedirs(data_dir, exist_ok=True)

    caminho_csv = os.path.join(data_dir, "abelhas.csv")
    df.to_csv(caminho_csv, index=False)

    print(f"✅ Dados simulados salvos em {caminho_csv}")
