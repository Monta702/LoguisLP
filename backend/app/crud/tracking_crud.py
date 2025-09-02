from sqlalchemy.orm import Session
from app.db.models.tracking import Tracking
from app.schemas.tracking import TrackingCreate, TrackingUpdate


def get_tracking(db: Session, tracking_id: int):
    return db.query(Tracking).filter(Tracking.id == tracking_id).first()


def get_trackings(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Tracking).offset(skip).limit(limit).all()


def create_tracking(db: Session, tracking: TrackingCreate):
    db_tracking = Tracking(**tracking.dict())
    db.add(db_tracking)
    db.commit()
    db.refresh(db_tracking)
    return db_tracking


def update_tracking(db: Session, db_tracking: Tracking, tracking_update: TrackingUpdate):
    for key, value in tracking_update.dict(exclude_unset=True).items():
        setattr(db_tracking, key, value)
    db.commit()
    db.refresh(db_tracking)
    return db_tracking


def delete_tracking(db: Session, db_tracking: Tracking):
    db.delete(db_tracking)
    db.commit()
    return db_tracking

