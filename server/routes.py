from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc
import csv, io
from db import get_db
from models import Event
from schemas import EventCreate, EventResponse
from acl import EventACL
from typing import List

event_router = APIRouter()

@event_router.get("/", response_model=List[EventResponse])
def list_events(db: Session = Depends(get_db)):
    return db.query(Event).order_by(desc(Event.date)).all()

@event_router.post("/", response_model=EventResponse)
def create_event(event: EventCreate, db: Session = Depends(get_db)):
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
