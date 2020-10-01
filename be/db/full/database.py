from db.settings import DATABASE_FULL_SQLITE3_URL
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

engine_f = create_engine(
    DATABASE_FULL_SQLITE3_URL,
    connect_args={"check_same_thread": False},
    encoding="utf-8",
    pool_recycle=3600,
    echo=True,
)
SessionLocalF = scoped_session(
    sessionmaker(
        bind=engine_f, expire_on_commit=False, autoflush=True, autocommit=False
    )
)

BaseF = declarative_base()
