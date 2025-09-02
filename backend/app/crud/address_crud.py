from sqlalchemy.orm import Session
from app.db.models.address import Address
from app.schemas.address import AddressCreate, AddressUpdate


def get_address(db: Session, address_id: int):
    return db.query(Address).filter(Address.id == address_id).first()


def get_addresses(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Address).offset(skip).limit(limit).all()


def create_address(db: Session, address: AddressCreate):
    db_address = Address(**address.dict())
    db.add(db_address)
    db.commit()
    db.refresh(db_address)
    return db_address


def update_address(db: Session, db_address: Address, address_update: AddressUpdate):
    for key, value in address_update.dict(exclude_unset=True).items():
        setattr(db_address, key, value)
    db.commit()
    db.refresh(db_address)
    return db_address


def delete_address(db: Session, db_address: Address):
    db.delete(db_address)
    db.commit()
    return db_address
