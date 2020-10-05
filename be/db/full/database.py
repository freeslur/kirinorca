from db.settings import DATABASE_FULL_SQLITE3_URL
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

engine = create_engine(
    DATABASE_FULL_SQLITE3_URL,
    connect_args={"check_same_thread": False},
    encoding="utf-8",
    pool_recycle=3600,
    echo=True,
)

SessionLocal = scoped_session(
    sessionmaker(bind=engine, expire_on_commit=False, autoflush=True, autocommit=False)
)

Base = declarative_base()
Base.query = SessionLocal.query_property()
