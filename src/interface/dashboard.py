import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
from analise.modelo import treinar_modelo

st.title("🐝 Monitoramento de Abelhas com IoT + ML")

# Carregar dados
df = pd.read_csv("data/abelhas.csv")
st.subheader("📂 Dados Simulados")
st.dataframe(df.head())

# Gráficos
st.subheader("📈 Distribuição dos Dados")
fig, ax = plt.subplots()
df[["temperatura", "umidade", "poluicao"]].hist(ax=ax, bins=15)
st.pyplot(fig)

# Treinar modelo
st.subheader("🤖 Previsão com Machine Learning")
modelo = treinar_modelo("data/abelhas.csv")

temp = st.slider("Temperatura (°C)", 15, 40, 25)
umid = st.slider("Umidade (%)", 30, 90, 60)
pol = st.slider("Poluição", 10, 80, 30)

pred = modelo.predict([[temp, umid, pol]])[0]
st.write("🔮 Atividade Prevista:", "Alta" if pred == 1 else "Baixa")
