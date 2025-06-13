from sqlmodel import SQLModel, Field, create_engine, Session
from typing import Optional
from datetime import datetime


class Layout(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    data: str  # JSON layout blocks
    summary: Optional[str] = None  # ✅ New field
    created_at: datetime = Field(default_factory=datetime.utcnow)


sqlite_url = "sqlite:///layouts.db"
engine = create_engine(sqlite_url, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    return Session(engine)