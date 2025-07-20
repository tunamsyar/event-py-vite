from datetime import datetime
from schemas import EventCreate
from models import Event
from sqlalchemy.orm import Session
class EventACL:
    @staticmethod
    def transform(raw: dict) -> EventCreate:
        print(f"[DEBUG] Raw input row: {raw}")
        errors = {}

        def required(field: str) -> str:
            val = raw.get(field, "").strip()
            if not val:
                errors[field] = f"{field} is required."
            return val

        # Extract and validate required fields
        name = required("name")
        contact = required("contact")
        venue = required("venue")
        date_str = required("date")

        # Optional fields
        url = raw.get("url", "").strip() or None
        type_ = raw.get("type", "").strip() or None
        status = raw.get("status", "").strip() or None

        # Parse date
        try:
            parsed_date = EventACL._parse_date(date_str)
        except ValueError as e:
            errors["date"] = f"Invalid date format: {str(e)}"

        if errors:
            raise ValueError(f"Validation failed: {errors}")

        print(f"[DEBUG] Transformed data: name={name}, contact={contact}, venue={venue}, date={parsed_date}, url={url}, type={type_}, status={status}")

        return EventCreate(
            name=name,
            contact=contact,
            venue=venue,
            date=parsed_date,
            url=url,
            type=type_,
            status=status,
        )

    @staticmethod
    def is_duplicate(event_data: EventCreate, db: Session) -> bool:
        exists = (
            db.query(Event)
            .filter(
                Event.name == event_data.name,
                Event.venue == event_data.venue,
                Event.date == event_data.date,
            )
            .first()
        )
        print(f"[DEBUG] Checking for duplicates: exists={bool(exists)}")
        return bool(exists)

    @staticmethod
    def _parse_date(date_str: str) -> datetime:
        # Try multiple date formats for robustness
        for fmt in ("%d/%m/%Y", "%Y-%m-%d", "%d-%m-%Y"):
            try:
                return datetime.strptime(date_str, fmt)
            except ValueError:
                continue
        raise ValueError("Supported date formats: dd/mm/yyyy, yyyy-mm-dd, dd-mm-yyyy")
