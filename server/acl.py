from datetime import datetime
from schemas import EventCreate
from models import Event
from sqlalchemy.orm import Session
from sqlalchemy import and_

# ==== Anti Corruption Layer ====
class EventACL:
    REQUIRED_FIELDS = ["name", "contact", "venue", "date"]

    @staticmethod
    def transform(raw: dict) -> EventCreate:
        errors = {}
        data = {}

        for field in EventACL.REQUIRED_FIELDS:
            value = raw.get(field, "").strip()
            if not value:
                errors[field] = "This field is required."
            else:
                data[field] = value

        if errors:
            raise ValueError(f"Validation failed: {errors}")

        try:
            data["date"] = EventACL._parse_date(data["date"])
        except ValueError as e:
            errors["date"] = str(e)

        if errors:
            raise ValueError(f"Validation failed: {errors}")

        return EventCreate(
            name=data["name"],
            contact=data["contact"],
            venue=data["venue"],
            date=data["date"],
            url=data["url"],
            type=data["type"],
            status=data["status"]
        )

    @staticmethod
    def _parse_date(value: str) -> datetime:
        try:
            return datetime.fromisoformat(value)
        except ValueError:
            pass

        formats = ["%Y-%m-%d", "%d/%m/%Y", "%Y-%m-%d %H:%M"]
        for fmt in formats:
            try:
                return datetime.strptime(value, fmt)
            except ValueError:
                continue

        raise ValueError(f"Invalid date format: {value}. Expected ISO or YYYY-MM-DD.")

    @staticmethod
    def is_duplicate(event: EventCreate, db: Session) -> bool:
        return db.query(Event).filter(
            and_(
                Event.name == event.name,
                Event.venue == event.venue,
                Event.date == event.date
            )
        ).first() is not None
