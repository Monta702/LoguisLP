from pydantic import BaseModel
from datetime import datetime
from enum import Enum

class EstadoEnvio(str, Enum):
    pendiente = "pendiente"
    en_transito = "en_transito"
    entregado = "entregado"
    cancelado = "cancelado"

class TrackingBase(BaseModel):
    estado: EstadoEnvio
    comentarios: str | None = None

class TrackingCreate(TrackingBase):
    shipment_id: int

class TrackingUpdate(TrackingBase):
    pass

class TrackingOut(TrackingBase):
    id: int
    fecha: datetime
    shipment_id: int

    class Config:
        orm_mode = True
