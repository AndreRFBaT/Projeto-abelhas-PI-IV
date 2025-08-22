
# 🐝 Monitoramento de Abelhas com IoT + Machine Learning

Este projeto simula e analisa, em tempo real, dados de um ambiente monitorado por sensores voltados ao comportamento de abelhas. Os dados simulam informações como temperatura, umidade, poluição e número de abelhas ativas, sendo constantemente atualizados em um arquivo CSV (inicialmente).

A análise é feita com aprendizado de máquina (ML) e os resultados são exibidos em tempo real por meio de uma interface web interativa criada com Streamlit.

## 🔧 Funcionalidades

- Geração contínua de dados simulados (sensores IoT)
- Armazenamento incremental em CSV (`data/abelhas.csv`)
- Re-treinamento automático de um modelo Random Forest
- Cálculo de métricas de desempenho (acurácia, matriz de confusão, relatório de classificação)
- Interface interativa com atualização automática
- Previsões baseadas em novos parâmetros simulados

## 📊 Tecnologias Utilizadas

- **Python 3.12.3**
- **Pandas** – manipulação de dados
- **NumPy** – geração de dados simulados
- **Scikit-learn** – treino do modelo de aprendizado de máquina (Random Forest)
- **Matplotlib & Seaborn** – visualizações gráficas
- **Streamlit** – criação de dashboards interativos
- **streamlit-autorefresh** – atualização automática da interface
- **IoT Simulation** – dados gerados por script, simulando 
---
<br>

## ⚙️ Instalação

**1 -** Clone o repositório e acesse a pasta do projeto:

```bash
git clone <URL_DO_REPO>
cd Projeto-abelhas-PI-IV
```

**2 -** Crie e ative um ambiente virtual:

    ```bash
    python -m venv venv
    source venv/bin/activate   # Linux/Mac
    venv\Scripts\activate      # Windows
    ```

**3 -** Instale as dependências:

    ```bash
    pip install -r requirements.txt
    ```
---
<br>

## 📊 Gerar Dados Simulados

O projeto inclui um script que gera dados fictícios de sensores de colmeias (temperatura, umidade, poluição e número de abelhas ativas).


### Para rodar dados gerados uma vez:

```bash
python src/coleta/gerar_dados.py
```

### Para gerar dados constantes com limite de 500 linhas

```bash
python src/coleta/stream_dados.py
```

✅ Cria o arquivo data/abelhas.csv.

---
<br>


## 🤖 Treinar o Modelo de Machine Learning

Você pode rodar a análise e treinar o modelo de forma isolada:

```bash
python src/analise/modelo.py
```

✅ Treina um Random Forest e mostra a acurácia do modelo.

---
<br>

## 📈 Executar o Dashboard Interativo

Para abrir a interface do projeto:

```bash
streamlit run src/interface/dashboard.py
```

O Streamlit irá abrir no navegador em:

Local: http://localhost:8501

---

## 📁 Estrutura do Projeto
```
projeto-abelhas/
│── src/
│   ├── coleta/          # Scripts de coleta/simulação de dados
│   │   └── gerar_dados.py
│   ├── analise/         # Processamento e Machine Learning
│   │   └── modelo.py
│   ├── interface/       # Interface (Streamlit)
│   │   └── dashboard.py
│   └── utils/           # Funções auxiliares
│       └── helpers.py
│── data/
│   └── abelhas.csv      # Dados coletados/simulados
│── requirements.txt
│── README.md
```

## Comandos para dev:

- Gerar `equirements.txt` para cada dependência instalada:

```bash
pip freeze > requirements.txt
```