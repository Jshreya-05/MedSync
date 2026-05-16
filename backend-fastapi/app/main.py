from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import alerts, hospitals, health

app = FastAPI(
    title=settings.app_name,
    description="Hospital coordination, emergency alerts, and AI predictions",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(hospitals.router, prefix="/api")
app.include_router(alerts.router, prefix="/api")
