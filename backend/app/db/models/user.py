from sqlalchemy import Column, Integer, String, DateTime
from sqlite3 import Cursor
from app.db.base_class import Base

class User(Base):

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
