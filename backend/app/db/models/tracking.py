from sqlalchemy import Column, Integer, ForeignKey, DateTime, Text, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.db.base_class import Base


class EstadoEnvio(enum.Enum):
    pendiente = "pendiente"
    en_transito = "en_transito"
    entregado = "entregado"
    cancelado = "cancelado"


class Tracking(Base):
    __tablename__ = "tracking"

    id = Column(Integer, primary_key=True, index=True)
    estado = Column(Enum(EstadoEnvio), nullable=False)
    fecha = Column(DateTime, default=datetime.utcnow)
    comentarios = Column(Text, nullable=True)
    # Clave foránea
    shipment_id = Column(Integer, ForeignKey("shipments.id"), nullable=False)

    # Relación inversa
    shipment = relationship("Shipment", back_populates="tracking")
