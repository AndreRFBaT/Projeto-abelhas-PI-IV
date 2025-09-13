"""
main.py
=======

Initializes the FastAPI application for the Abelhas IoT+ML project.
Sets up database tables, configures CORS, includes API routers, and starts a background data simulator on startup.

Main Components
---------------

- Database Initialization: Creates all tables using SQLAlchemy's Base.metadata.create_all.
- FastAPI App Initialization: Sets the app title to "API Abelhas IoT+ML".
- CORS Middleware: Allows cross-origin requests from specified frontend origins (development only).
- Routers: Includes routers for data and machine learning endpoints.
- Root Endpoint: GET / returns a simple health check JSON.
- Startup Event: Runs the data simulator in the background when the app starts.

Usage
-----

Run with Uvicorn for development:
    `uvicorn app.main:app --reload`
    or
    `uvicorn app.main:app --reload --port 8001`

The API will be available at / and other endpoints defined in the routers.

Dependencies
------------

FastAPI, SQLAlchemy, asyncio, app.db, app.routers, app.simulator
"""
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .db import Base, engine
from .routers import data as data_router
from .routers import model_manager_routers as ml_router
from .routers import data
# Import do simulador
import asyncio
from .simulator import simulate_data
from .routers import model_manager_routers as ml_router
from app.routers import data, model_manager_routers

# Criação das tabelas
Base.metadata.create_all(bind=engine)

# Inicialização do app
app = FastAPI(title="API Abelhas IoT+ML")

# frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")

frontend_origin = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://192.168.15.200:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # apenas para dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(data.router)
app.include_router(ml_router.router)
app.include_router(model_manager_routers.router)


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