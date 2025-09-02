from pydantic import BaseModel

class AddressBase(BaseModel):
    calle: str
    numero: str
    ciudad: str
    provincia: str
    codigo_postal: str
    pais: str

class AddressCreate(AddressBase):
    pass

class AddressUpdate(AddressBase):
    pass

class AddressOut(AddressBase):
    id: int

    class Config:
        orm_mode = True
