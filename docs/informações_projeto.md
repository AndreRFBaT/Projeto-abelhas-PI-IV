
---

## 📘 Descrição técnica para o Projeto Integrador

```markdown
# Projeto Integrador IV – Análise de Dados com IoT e Machine Learning

## 🎯 Objetivo

O projeto visa desenvolver uma aplicação de análise de dados em escala, integrando simulação de sensores IoT com aprendizado de máquina (Machine Learning), focada no monitoramento ambiental de abelhas. O objetivo é fornecer uma solução que permita a visualização em tempo real dos dados coletados, além de realizar previsões com base nesses dados.

## 🧪 Descrição Técnica

### 💡 Simulação de Dados IoT

Os dados são gerados por um script Python que simula sensores de ambiente. As variáveis monitoradas incluem:

- Temperatura ambiente (°C)
- Umidade relativa do ar (%)
- Poluição ambiental (índice)
- Número de abelhas ativas

Esses dados são atualizados continuamente e armazenados em um arquivo CSV, que simula o papel de um "data lake" local.

### 🤖 Aprendizado de Máquina

Utiliza-se o algoritmo **Random Forest Classifier** da biblioteca **scikit-learn** para classificar a atividade das abelhas como “Alta” ou “Baixa”, com base nas variáveis:

- Temperatura
- Umidade
- Poluição

O modelo é treinado automaticamente a cada nova leitura dos dados, utilizando validação cruzada com `train_test_split`.

As métricas avaliadas incluem:

- **Acurácia**
- **Matriz de Confusão**
- **Relatório de Classificação (Precision, Recall, F1-score)**

### 📊 Visualização Interativa com Streamlit

Foi desenvolvida uma interface gráfica com **Streamlit**, que permite:

- Visualização dos dados mais recentes
- Gráficos de distribuição das variáveis
- Análise da atividade das abelhas
- Métricas de desempenho do modelo
- Simulação de novas previsões usando sliders

A interface é atualizada automaticamente a cada 10 segundos, por meio do componente `streamlit_autorefresh`.

### 🧱 Tecnologias Utilizadas

| Tecnologia       | Função                                        |
|------------------|-----------------------------------------------|
| Python 3.12       | Linguagem principal                           |
| Pandas            | Manipulação de dados                         |
| NumPy             | Geração de dados simulados                   |
| Scikit-learn      | Treinamento do modelo ML (Random Forest)     |
| Matplotlib        | Geração de gráficos                          |
| Streamlit         | Interface web interativa                     |
| streamlit_autorefresh | Atualização periódica da interface     |

### 📂 Estrutura Modular

- `src/analise/modelo.py`: Treinamento do modelo de machine learning
- `src/scripts/steam.py`: Simulação contínua de dados
- `src/interface/dashboard.py`: Dashboard com visualização dos resultados
- `data/abelhas.csv`: Armazenamento local dos dados gerados

## 📌 Conclusão

O projeto integra componentes de geração de dados IoT, aprendizado de máquina e visualização interativa em uma aplicação coesa, que pode ser facilmente adaptada a cenários reais de monitoramento ambiental ou agrícola.
