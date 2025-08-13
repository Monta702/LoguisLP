from sqlalchemy import Column, Integer, ForeignKey, DateTime, Text, Float, String
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base_class import Base


class Shipment(Base):
    __tablename__ = "shipments"

    id = Column(Integer, primary_key=True, index=True)
    #clave foranea
    empleado_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    #----------------------------------------------------------
    dni_remitente = Column(String(20), nullable=False)
    dni_destinatario = Column(String(20), nullable=False)
    #clave foranea
    direccion_destino_id = Column(Integer, ForeignKey("addresses.id"), nullable=False)
    #--------------------------------------------------------
    descripcion = Column(Text, nullable=True)
    peso = Column(Float, nullable=True)
    fecha_creacion = Column(DateTime, default=datetime.utcnow)

    # Relaciones 
    empleado = relationship("User") 
    address = relationship("Address", back_populates="shipments")
    tracking = relationship("Tracking", uselist=True, back_populates="shipment", cascade="all, delete-orphan")

