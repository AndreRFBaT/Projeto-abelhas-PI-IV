import pandas as pd
import numpy as np

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
    return df

if __name__ == "__main__":
    df = gerar_dados()
    df.to_csv("../../data/abelhas.csv", index=False)
    print("✅ Dados simulados salvos em data/abelhas.csv")
