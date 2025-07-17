from schemas import EventCreate
from datetime import datetime

# ==== Anti Corruption Layer ====
class EventACL:
    @staticmethod
    def transform(raw: dict) -> EventCreate:
        try:
            # Map & validate structure
            return EventCreate(
                name=raw["name"].strip(),
                contact=raw["contact"].strip(),
                venue=raw["venue"].strip(),
                date=datetime.fromisoformat(raw["date"].strip())
            )
        except Exception as e:
            raise ValueError(f"Invalid row: {raw} - {e}")
