from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc
from datetime import datetime
import csv, io
from db import get_db
from models import Event
from schemas import EventCreate, EventResponse
from acl import EventACL
from typing import List
from utils.qr_service import generate_qr_code

event_router = APIRouter()

@event_router.get("/", response_model=List[EventResponse])
def list_events(
    db: Session = Depends(get_db),
    name: str = Query(None),
    location: str = Query(None),
    start_date: datetime = Query(None),
    end_date: datetime = Query(None)
):
    query = db.query(Event)

    if name:
        query = query.filter(Event.name.ilike(f"%{name}%"))
    if location:
        query = query.filter(Event.venue.ilike(f"%{location}%"))
    if start_date:
        query = query.filter(Event.date >= start_date)
    if end_date:
        query = query.filter(Event.date <= end_date)

    return query.order_by(desc(Event.date)).all()

@event_router.post("/", response_model=EventResponse)
def create_event(event: EventCreate, db: Session = Depends(get_db)):
    if EventACL.is_duplicate(event, db):
      raise HTTPException(
          status_code=400,
          detail="Duplicate event: An event with the same name, venue, and date already exists."
    )

    new_event = Event(**event.dict())
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event

@event_router.post("/import")
def import_events(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        contents = file.file.read().decode("utf-8")
        reader = csv.DictReader(io.StringIO(contents))

        events = []
        errors = []
        row_number = 1

        for row in reader:
            row_number += 1
            try:
                validated = EventACL.transform(row)

                if EventACL.is_duplicate(validated, db):
                    errors.append({
                        "row": row_number,
                        "error": "Duplicate event: name, venue, and date already exist"
                    })
                    continue

                event = Event(**validated.dict())
                events.append(event)
            except ValueError as ve:
                errors.append({"row": row_number, "error": str(ve)})
                continue

        if events:
            db.bulk_save_objects(events)
            db.commit()

        return {"imported": len(events), "errors": errors}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@event_router.get("/generate_qr")
def get_qr(data: str = Query(..., description="Data to encode into QR")):
    return generate_qr_code(data)
