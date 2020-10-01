from db.settings import DATABASE_SIMPLE_SQLITE3_URL
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

engine_s = create_engine(
    DATABASE_SIMPLE_SQLITE3_URL,
    connect_args={"check_same_thread": False},
    encoding="utf-8",
    pool_recycle=3600,
    echo=True,
)

SessionLocalS = scoped_session(
    sessionmaker(
        bind=engine_s, expire_on_commit=False, autoflush=True, autocommit=False
    )
)

BaseS = declarative_base()
BaseS.query = SessionLocalS.query_property()
