import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import sys, os
from streamlit_autorefresh import st_autorefresh

# Atualiza a cada 1000ms (1 segundo)
st_autorefresh(interval=10000, key="datarefresh")

# Ajuste de caminho para importar corretamente o modelo
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(BASE_DIR)

from src.analise.modelo import treinar_modelo

# =================== TÍTULO ===================
st.title("🐝 Monitoramento de Abelhas com IoT + ML")

# =================== DESCRIÇÃO DOS DADOS ===================
st.markdown("""
### ℹ️ Sobre os Dados

- **Temperatura (°C):** Temperatura ambiente medida no local das abelhas.
- **Umidade (%):** Umidade relativa do ar.
- **Poluição:** Índice fictício de poluição do ambiente.
- **Abelhas Ativas:** Contagem de abelhas em atividade.
- **Atividade Alta:** 1 indica que o número de abelhas ativas é considerado alto (> 500).
- **Atividade:** Classificação textual da atividade (Alta ou Baixa).
""")

# =================== CARREGAR DADOS ===================
df = pd.read_csv("data/abelhas.csv")
st.subheader("📂 Dados Simulados")
st.dataframe(df.head())

# =================== GRÁFICOS DE DISTRIBUIÇÃO ===================
st.subheader("📈 Distribuição dos Dados Numéricos")
fig, axs = plt.subplots(1, 3, figsize=(15, 4))
df["temperatura"].hist(ax=axs[0], bins=15, color="orange")
axs[0].set_title("Temperatura (°C)")
df["umidade"].hist(ax=axs[1], bins=15, color="skyblue")
axs[1].set_title("Umidade (%)")
df["poluicao"].hist(ax=axs[2], bins=15, color="green")
axs[2].set_title("Poluição")
st.pyplot(fig)

# =================== DISTRIBUIÇÃO DE ATIVIDADE ===================
st.subheader("🐝 Nível de Atividade das Abelhas")
fig2, ax2 = plt.subplots()
df["atividade"].value_counts().plot(kind='bar', ax=ax2, color=['orange', 'skyblue'])
ax2.set_ylabel("Contagem")
ax2.set_xlabel("Atividade")
ax2.set_title("Distribuição da Atividade das Abelhas")
st.pyplot(fig2)

# =================== TREINAR E AVALIAR O MODELO ===================
modelo, acc, cm, report = treinar_modelo("data/abelhas.csv")

st.subheader("📊 Estatísticas do Modelo")
st.write(f"**Acurácia:** {acc:.2f}")

st.write("**Matriz de Confusão**")
st.dataframe(pd.DataFrame(cm, columns=["Prev. Baixa", "Prev. Alta"], index=["Real Baixa", "Real Alta"]))

st.write("**Relatório de Classificação**")
st.dataframe(pd.DataFrame(report).transpose())

# =================== PREVISÃO COM O MODELO ===================
st.subheader("🤖 Previsão com Machine Learning")
st.markdown("Ajuste os valores abaixo para simular uma previsão:")

temp = st.slider("Temperatura (°C)", 15, 40, 25)
umid = st.slider("Umidade (%)", 30, 90, 60)
pol = st.slider("Poluição", 10, 80, 30)

pred = modelo.predict([[temp, umid, pol]])[0]
st.write("🔮 **Atividade Prevista:**", "**Alta**" if pred == 1 else "**Baixa**")
