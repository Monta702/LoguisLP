from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

# Importar routers
from app.api.routes import auth, user, address, shipment, tracking

app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)

# Configurar CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    # al desplegar en Azure, agrego la URL del frontend
    # "https://tu-dominio-frontend.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # Permitir estos orígenes
    allow_credentials=True,
    allow_methods=["*"],            # Permitir todos los métodos (GET, POST, etc.)
    allow_headers=["*"],            # Permitir todos los headers
)

# Incluir routers
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(address.router)
app.include_router(shipment.router)
app.include_router(tracking.router)

@app.get("/")
def read_root():
    return {"message": "Hello World"}
