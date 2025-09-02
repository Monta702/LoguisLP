from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.api.deps import get_db
from app.crud.shipment_crud import create_shipment, get_shipment, get_shipments, update_shipment, delete_shipment
from app.schemas.shipment import ShipmentCreate, ShipmentUpdate, ShipmentOut

router = APIRouter(prefix="/shipments", tags=["Shipments"])

@router.post("/", response_model=ShipmentOut)
def create_shipment_endpoint(shipment: ShipmentCreate, db: Session = Depends(get_db)):
    return create_shipment(db, shipment)

@router.get("/", response_model=List[ShipmentOut])
def list_shipments(db: Session = Depends(get_db)):
    return get_shipments(db)

@router.get("/{shipment_id}", response_model=ShipmentOut)
def get_shipment_endpoint(shipment_id: int, db: Session = Depends(get_db)):
    db_shipment = get_shipment(db, shipment_id)
    if not db_shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    return db_shipment

@router.put("/{shipment_id}", response_model=ShipmentOut)
def update_shipment_endpoint(shipment_id: int, shipment: ShipmentUpdate, db: Session = Depends(get_db)):
    db_shipment = get_shipment(db, shipment_id)
    if not db_shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    return update_shipment(db, db_shipment, shipment)

@router.delete("/{shipment_id}", response_model=ShipmentOut)
def delete_shipment_endpoint(shipment_id: int, db: Session = Depends(get_db)):
    db_shipment = get_shipment(db, shipment_id)
    if not db_shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    return delete_shipment(db, db_shipment)
