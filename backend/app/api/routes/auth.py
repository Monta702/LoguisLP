# app/api/routes/auth.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

from app.api.deps import get_db
from app.crud.user_crud import get_user_by_email, create_user
from app.schemas.user import UserCreate, UserOut  # <-- usar UserOut, no UserRead

router = APIRouter(prefix="/auth", tags=["Auth"])

# Esquemas locales para login
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut

@router.post("/register", response_model=UserOut)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    if get_user_by_email(db, user_in.email):
        raise HTTPException(status_code=400, detail="Email ya registrado")
    user = create_user(db, user_in)  # usa método que hashea password
    return user

@router.post("/login", response_model=LoginResponse)
def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    user = get_user_by_email(db, credentials.email)
    if not user or not user.verify_password(credentials.password):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    # TODO: generar JWT real (python-jose). Por ahora un token dummy para avanzar con el front.
    return {"access_token": f"dummy-{user.id}", "token_type": "bearer", "user": user}

