from sqlalchemy import create_engine, Column, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./memory.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


class Memory(Base):
    __tablename__ = "memory"

    key = Column(String, primary_key=True, index=True)
    painting = Column(String)
    character = Column(String)
    summary = Column(Text)


Base.metadata.create_all(bind=engine)