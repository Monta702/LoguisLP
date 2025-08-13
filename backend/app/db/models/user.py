from sqlalchemy import Column, Integer, String, DateTime
from sqlite3 import Cursor
from app.db.base_class import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String, nullable=False)

    # Relaciones
    shipments = relationship("Shipment", back_populates="empleado", cascade="all, delete-orphan")
