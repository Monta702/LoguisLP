from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.base_class import Base
from passlib.context import CryptContext

# Contexto para hashing de contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)

    # Métodos para contraseñas
    
    def set_password(self, password: str):
        """Hashea y guarda la contraseña."""
        self.password_hash = pwd_context.hash(password)

    def verify_password(self, password: str) -> bool:
        """Verifica si la contraseña coincide con el hash guardado."""
        return pwd_context.verify(password, self.password_hash)

    # Relaciones
    shipments = relationship("Shipment", back_populates="empleado", cascade="all, delete-orphan")

