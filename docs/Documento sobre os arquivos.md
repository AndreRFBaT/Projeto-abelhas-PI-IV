
---

## 1. Diretório `app/`

Contém toda a lógica backend do projeto, incluindo API, banco de dados, modelos de machine learning e simulação.

- **`api/`** – Contém endpoints da API FastAPI.
  - `__init__.py` – Inicializa o pacote.
  - `data.py` – Router para disponibilizar os dados de abelhas via API.
  - `ml.py` – Router para endpoints de Machine Learning (`/predicao` e `/treinar`).
  
- **`db.py`** – Configuração do banco de dados SQLAlchemy (SQLite).
  
- **`main.py`** – Arquivo principal que inicializa a aplicação FastAPI.
  
- **`ml.py`** – Gerencia o modelo de Machine Learning:
  - Treinamento (`train`)
  - Predição (`predict`)
  - Previsão temporal (`forecast`)
  
- **`models.py`** – Modelos do banco de dados (SQLAlchemy), como `BeeRecord`.
  
- **`schemas.py`** – Schemas Pydantic para validação de dados e resposta da API.
  
- **`simulator.py`** – Script para simular dados de abelhas, útil para testes e treino do modelo.

- **`__pycache__/`** – Cache dos arquivos Python compilados.

---

## 2. Arquivos do projeto

- **`data.db`** – Banco de dados SQLite que armazena registros de abelhas, ruído, poluição, etc.
- **`model.pkl`** – Arquivo do modelo de Machine Learning treinado (`RandomForestClassifier`).
- **`requirements.txt`** – Dependências do Python utilizadas no backend.
- **`estrutura.txt`** – Arquivo de referência sobre a estrutura do projeto (informativo).

---

## 3. Diretório `public/`

Contém arquivos estáticos acessíveis pelo frontend.

- `emergency-alarm.mp3` – Áudio utilizado para alertas sonoros.
- `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` – Ícones utilizados no frontend.

---

## 4. Diretório `src/app/`

Contém o frontend da aplicação, desenvolvido em Next.js + TypeScript.

- **`data/dados.ts`** – Arquivo de configuração ou fetch de dados do frontend (tipo mock ou helpers).
- **`favicon.ico`** – Ícone da aplicação.
- **`globals.css`** – Estilos globais CSS da aplicação.
- **`layout.tsx`** – Layout principal da aplicação (template, header, footer).
- **`page.tsx`** – Página principal do dashboard, contém:
  - Gráficos de temperatura, umidade, poluição e ruído.
  - Estatísticas de atividade das abelhas.
  - Predição automática de atividade.
  - Alertas sonoros e visuais.

---

## 5. Configurações e arquivos do projeto Next.js

- **`next.config.ts`** – Configuração do Next.js.
- **`next-env.d.ts`** – Tipagem TypeScript para Next.js.
- **`tsconfig.json`** – Configuração TypeScript.
- **`package.json` / `package-lock.json`** – Dependências do Node.js e scripts.
- **`postcss.config.mjs` / `eslint.config.mjs`** – Configurações de CSS e ESLint.

---

## Observações gerais

- O backend em **FastAPI** está separado do frontend Next.js (`src/app`), mas ambos compartilham a mesma base de dados `data.db`.
- O modelo de Machine Learning (`RandomForestClassifier`) é atualizado automaticamente quando há dados suficientes e pode fazer predições em tempo real.
- O frontend consome os endpoints da API via fetch/SWR e atualiza os gráficos em tempo real (intervalo de 3s).

---


# Comandos do Projeto – Monitoramento de Abelhas

Este arquivo lista os principais comandos para configurar, rodar e testar o projeto.

---

## 1. Backend (FastAPI / Python)

### 1.1. Criar ambiente virtual (opcional, mas recomendado)
```bash
python3 -m venv venv
source venv/bin/activate   # Linux / Mac
venv\Scripts\activate      # Windows
```

### 1.2. Instalar dependências
```bash
pip install -r requirements.txt
```
Isso instalará FastAPI, SQLAlchemy, scikit-learn, pandas, numpy, joblib, statsmodels e outras dependências.

### 1.3. Rodar servidor FastAPI (desenvolvimento)
```bash
uvicorn app.main:app --reload
```
Vai subir a API no endereço: http://localhost:8001

--reload atualiza automaticamente ao alterar código.

# Frontend (Next.js / TypeScript)

Instalar dependências:
```bash
npm install
# ou
yarn install
```

Rodar frontend em desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

Build e start para produção:
```bash
npm run build && npm start
# ou
yarn build && yarn start
```

## Banco de dados (SQLite)

### Verificar tabelas:

```bash
sqlite3 data.db
.tables
```

Ver estrutura de tabela:
```bash
.schema BeeRecord
.exit
```