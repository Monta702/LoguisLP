from fastapi import FastAPI
from app.core.config import settings
from app.db import Base
app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)

@app.get("/")
def read_root():
    return {"message": "Hello World"}
