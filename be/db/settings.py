import os

DATABASE_SIMPLE_SQLITE3_URL = "sqlite:///" + os.path.join(
    os.path.abspath(os.path.dirname(__file__)), "demo_simple.sqlite3"
)

DATABASE_FULL_SQLITE3_URL = "sqlite:///" + os.path.join(
    os.path.abspath(os.path.dirname(__file__)), "demo_full.sqlite3"
)
