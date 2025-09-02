from fastapi import FastAPI
from app.core.config import settings

# Importar routers
from app.api.routes import user, address, shipment, tracking

app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)

# Incluir routers
app.include_router(user.router)
app.include_router(address.router)
app.include_router(shipment.router)
app.include_router(tracking.router)

@app.get("/")
def read_root():
    return {"message": "Hello World"}
