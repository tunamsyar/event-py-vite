from pydantic import BaseModel
from datetime import datetime
from uuid import UUID
from typing import Optional

class EventBase(BaseModel):
    name: str
    contact: str
    venue: str
    date: datetime
    url: Optional[str] = None
    type: Optional[str] = None
    status: Optional[str] = None

class EventCreate(EventBase):
    pass

class EventResponse(EventBase):
    id: UUID

    class Config:
        orm_mode = True

