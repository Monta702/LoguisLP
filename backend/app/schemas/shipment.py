from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from app.schemas.tracking import TrackingOut

class ShipmentBase(BaseModel):
    dni_remitente: str
    dni_destinatario: str
    descripcion: Optional[str] = None
    peso: Optional[float] = None
    empleado_id: int
    direccion_destino_id: int

class ShipmentCreate(ShipmentBase):
    pass

class ShipmentUpdate(ShipmentBase):
    pass

class ShipmentOut(ShipmentBase):
    id: int
    fecha_creacion: datetime
    tracking: List[TrackingOut] = []

    class Config:
        orm_mode = True
