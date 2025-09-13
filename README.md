
# 🐝 Monitoramento de Abelhas com IoT + Machine Learning

Este projeto tem como objetivo **monitorar colmeias de abelhas sem ferrão** utilizando sensores IoT para coleta de dados ambientais. Inicialmente os dados são simulados e geram informações como temperatura, umidade, ruídos, poluição e número de abelhas ativas, sendo constantemente atualizados e salvos no banco de dados, possui uma interface web com **Next.js** para visualização em tempo real.

A solução integra **backend (FastAPI)**, **frontend (Next.js)** e **banco de dados relacional**, permitindo análises e alertas automáticos sobre as condições das colmeias.

---
<br>

## Execução e dados apresentados

### Captura de dados de temperatura, umidada, ruido e poluição:

<video controls src="images_and_videos/Gravação de tela de 2025-09-13 09-39-53.mp4" title="Title"></video>

### Atividade das abelhas:

<video controls src="images_and_videos/Gravação de tela de 2025-09-13 09-43-10.mp4" title="Title"></video>

----

## 📖 Funcionalidades

- 📡 Coleta de dados de sensores simulados (temperatura, umidade, poluição, atividade das abelhas).
- 🔍 Processamento de dados e geração de insights com ML.
- 🌐 API REST com **FastAPI** para servir os dados.
- 🖥️ Interface web em **Next.js** (React Framework).
- 🔐 Suporte a **HTTPS** para maior segurança.
- ⚡ Deploy preparado para ambientes de nuvem (Glitch, Vercel, Railway, etc).

---
<br>

## 🛠️ Tecnologias Utilizadas

| Camada             | Tecnologias                                   |
|--------------------|-----------------------------------------------|
| Backend            | [FastAPI](https://fastapi.tiangolo.com/), Uvicorn |
| Frontend           | [Next.js](https://nextjs.org/), React         |
| Banco de Dados     | SQLite/MySQL (configurável)                   |
| Machine Learning   | NumPy, Pandas, Scikit-learn, Joblib           |
| IoT Simulação      | Scripts em Python com geração de dados        |
| Visualização       | Recharts / Chart.js                           |
| Segurança          | HTTPS, CORS                                   |

---
<br>



<details>
<summary><span style="font-size: 1.5em;"><strong>📁 Estrutura do Projeto</strong></span></summary>


```bash
├── backend
│   ├── app
│   │   ├── analize_model.py
│   │   ├── api
│   │   ├── db.py                             # define as conexões do banco de dados
│   │   ├── main.py                           # Inicializa o FastAPI do projeto 'Monitoramento de abelhas IoT+ML'
│   │   ├── model_manager.py                  # Gerenciador do modelo de machine learning
│   │   ├── models.py                         # Módulo que define a tabela 'abelhas_data'
│   │   ├── routers
│   │   │   ├── data.py                       # Define as rotas da aplicação do FastAPI
│   │   │   ├── __init__.py
│   │   │   └── model_manager_routers.py      # Define as rotas para as operações de Machine Learning
│   │   ├── schemas.py
│   │   └── simulator.py                      # Simulador dos dados gerados por sensor
│   ├── data.db                               # Dados armazenados durante a coleta
│   └── model.pkl
├── data
│   └── abelhas.csv
├── estrutura.txt
├── frontend
│   ├── eslint.config.mjs
│   ├── estrutura.txt
│   ├── next.config.ts
│   ├── next-env.d.ts
│   ├── package.json                          # Dependências JS
│   ├── package-lock.json
│   ├── postcss.config.mjs
│   ├── public
│   │   ├── emergency-alarm.mp3
│   │   ├── file.svg
│   │   ├── globe.svg
│   │   ├── next.svg
│   │   ├── vercel.svg
│   │   └── window.svg
│   ├── README.md
│   ├── src
│   │   └── app
│   │       ├── data
│   │       ├── favicon.ico
│   │       ├── globals.css
│   │       ├── layout.tsx
│   │       └── page.tsx                      # Página do projeto em Next.js
│   └── tsconfig.json
├── public
│   └── emergency-alarm.mp3
├── silumator
│   └── simulate.py
├── src                                       # Primeira versão de coleta e interface dos dados
│   ├── analise
│   │   ├── __init__.py
│   │   └── modelo.py
│   ├── coleta
│   │   ├── gerar_dados.py
│   │   └── stream_dados.py
│   ├── __init__.py
│   └── interface
│       ├── dashboard.py
│       └── __init__.py
├── README.md
├── requirements.txt
└── structure.txt
```
</details>

---
<br>


## ⚙️ Instalação

## 🐍 Backend (FastAPI)

### Iniciar back-end e rodar o servidor local

```bash

# Clone o repositório
git clone https://github.com/AndreRFBaT/Projeto-abelhas-PI-IV.git

# Crie um ambiente virtual
python3 -m venv venv
source venv/bin/activate    # Linux
# venv\Scripts\activate -> Windows

# Instale as dependências
pip install -r requirements.txt

# Execute a API
cd backend
uvicorn app.main:app --reload --port 8001
```

Acesse http://localhost:8000/docs para ver o swagger da API cpntendo as métodos dos endpoints.


----


<br>

## ⚛️ Frontend (Next.js)

## Instale as dependências
```bash
cd frontend
npm install
```

## Rodar em ambiente de desenvolvimento

```bash
npm run dev
```

A interface estará disponível em: http://localhost:3000

---
<!-- 
## Futuro deploy
Deploy (opcional)
🔹 Back-end (FastAPI)

Render.com

Crie um novo "Web Service"

Use o repositório do GitHub com o seu backend

Comando: uvicorn main:app --host 0.0.0.0 --port 10000

🔹 Front-end (React)

Vercel ou Netlify

Suba a pasta frontend para GitHub

Conecte no Vercel

Configure o proxy no package.json para chamar o back-end em produção


# Melhorias:

add DB para poder integrar armazenamento dos dados, ver qual BD é mais aconselhável para o FastApi



```

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd frontend
  npm start
```
 -->

<!-- ## Gerar Tree information
```bash
tree -L 4 -I "node_modules|__pycache__|.git|venv|docs" > structure.txt
``` -->
<br>


## Comandos para dev:

### Gerar `requirements.txt` para cada dependência instalada:

```bash
pip freeze > requirements.txt
```
----
### Gerar Tree information
```bash
tree -L 4 -I "node_modules|__pycache__|.git|venv|docs|public" > structure.txt
```
----
<br>

# 👥 Contribuidores

**Andre Rodrigues de Freitas Batista** – Eng. Computação - Univesp
### Contatos:

<div>
  <a href="https://www.linkedin.com/in/andre-rodrigues-de-freitas-batista/" target="_blank">
    <img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" target="_blank">
  </a>
  <a href="https://github.com/AndreRFBaT" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a>
  <a href="https://gitlab.com/AndreRFBaT" target="_blank"><img src="https://img.shields.io/badge/-GitLab-FCA121?style=for-the-badge&logo=gitlab&logoColor=white" alt="GitLab" target="_blank"></a>
  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=andrerfbatista@gmail.com" target="_blank">
  <img src="https://img.shields.io/badge/-Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail" />
  </a>
</div>
