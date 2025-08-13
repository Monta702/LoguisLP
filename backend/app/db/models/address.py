from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.base_class import Base


class Address(Base):
    __tablename__ = "addresses"

    id = Column(Integer, primary_key=True, index=True)
    calle = Column(String(100), nullable=False)
    numero = Column(String(20), nullable=False)
    ciudad = Column(String(50), nullable=False)
    provincia = Column(String(50), nullable=False)
    codigo_postal = Column(String(20), nullable=False)
    pais = Column(String(50), nullable=False)

    shipments = relationship("Shipment", back_populates="address")
