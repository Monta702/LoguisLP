from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.api.deps import get_db
from app.crud.tracking_crud import create_tracking, get_tracking, get_trackings, update_tracking, delete_tracking
from app.schemas.tracking import TrackingCreate, TrackingUpdate, TrackingOut

router = APIRouter(prefix="/tracking", tags=["Tracking"])

@router.post("/", response_model=TrackingOut)
def create_tracking_endpoint(tracking: TrackingCreate, db: Session = Depends(get_db)):
    return create_tracking(db, tracking)

@router.get("/", response_model=List[TrackingOut])
def list_trackings(db: Session = Depends(get_db)):
    return get_trackings(db)

@router.get("/{tracking_id}", response_model=TrackingOut)
def get_tracking_endpoint(tracking_id: int, db: Session = Depends(get_db)):
    db_tracking = get_tracking(db, tracking_id)
    if not db_tracking:
        raise HTTPException(status_code=404, detail="Tracking not found")
    return db_tracking

@router.put("/{tracking_id}", response_model=TrackingOut)
def update_tracking_endpoint(tracking_id: int, tracking: TrackingUpdate, db: Session = Depends(get_db)):
    db_tracking = get_tracking(db, tracking_id)
    if not db_tracking:
        raise HTTPException(status_code=404, detail="Tracking not found")
    return update_tracking(db, db_tracking, tracking)

@router.delete("/{tracking_id}", response_model=TrackingOut)
def delete_tracking_endpoint(tracking_id: int, db: Session = Depends(get_db)):
    db_tracking = get_tracking(db, tracking_id)
    if not db_tracking:
        raise HTTPException(status_code=404, detail="Tracking not found")
    return delete_tracking(db, db_tracking)
