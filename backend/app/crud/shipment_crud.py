from sqlalchemy.orm import Session
from app.db.models.shipment import Shipment
from app.schemas.shipment import ShipmentCreate, ShipmentUpdate


def get_shipment(db: Session, shipment_id: int):
    return db.query(Shipment).filter(Shipment.id == shipment_id).first()


def get_shipments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Shipment).offset(skip).limit(limit).all()


def create_shipment(db: Session, shipment: ShipmentCreate):
    db_shipment = Shipment(**shipment.dict())
    db.add(db_shipment)
    db.commit()
    db.refresh(db_shipment)
    return db_shipment


def update_shipment(db: Session, db_shipment: Shipment, shipment_update: ShipmentUpdate):
    for key, value in shipment_update.dict(exclude_unset=True).items():
        setattr(db_shipment, key, value)
    db.commit()
    db.refresh(db_shipment)
    return db_shipment


def delete_shipment(db: Session, db_shipment: Shipment):
    db.delete(db_shipment)
    db.commit()
    return db_shipment

