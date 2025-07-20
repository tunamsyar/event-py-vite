from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
import uuid
from db import Base

class Event(Base):
    __tablename__ = "events"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, nullable=False)
    contact = Column(String, nullable=False)
    venue = Column(String, nullable=False)
    date = Column(DateTime, nullable=False)
    url = Column(String, nullable=True)
    type = Column(String, nullable=True)
    status = Column(String, nullable=True)
