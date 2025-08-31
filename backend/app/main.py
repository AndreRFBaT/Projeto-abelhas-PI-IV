import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .db import Base, engine
from .routers import data as data_router
from .routers import ml as ml_router

# Import do simulador
import asyncio
from .simulator import simulate_data
from .routers import ml as ml_router

# Criação das tabelas
Base.metadata.create_all(bind=engine)

# Inicialização do app
app = FastAPI(title="API Abelhas IoT+ML")

frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_origin, "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(data_router.router)
app.include_router(ml_router.router)

# Root
@app.get("/")
async def root():
    return {"ok": True, "service": "abelhas-api"}

# 🚀 Startup: rodar simulador em background
@app.on_event("startup")
async def startup_event():
    asyncio.create_task(simulate_data())

# if __name__ == "__main__":
#     import uvicorn

#     uvicorn.run(app, host="0.0.0.0", port=8000)