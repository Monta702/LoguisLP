from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.api.deps import get_db
from app.crud.address_crud import create_address, get_address, get_addresses, update_address, delete_address
from app.schemas.address import AddressCreate, AddressUpdate, AddressOut

router = APIRouter(prefix="/addresses", tags=["Addresses"])

@router.post("/", response_model=AddressOut)
def create_address_endpoint(address: AddressCreate, db: Session = Depends(get_db)):
    return create_address(db, address)

@router.get("/", response_model=List[AddressOut])
def list_addresses(db: Session = Depends(get_db)):
    return get_addresses(db)

@router.get("/{address_id}", response_model=AddressOut)
def get_address_endpoint(address_id: int, db: Session = Depends(get_db)):
    db_address = get_address(db, address_id)
    if not db_address:
        raise HTTPException(status_code=404, detail="Address not found")
    return db_address

@router.put("/{address_id}", response_model=AddressOut)
def update_address_endpoint(address_id: int, address: AddressUpdate, db: Session = Depends(get_db)):
    db_address = get_address(db, address_id)
    if not db_address:
        raise HTTPException(status_code=404, detail="Address not found")
    return update_address(db, db_address, address)

@router.delete("/{address_id}", response_model=AddressOut)
def delete_address_endpoint(address_id: int, db: Session = Depends(get_db)):
    db_address = get_address(db, address_id)
    if not db_address:
        raise HTTPException(status_code=404, detail="Address not found")
    return delete_address(db, db_address)
