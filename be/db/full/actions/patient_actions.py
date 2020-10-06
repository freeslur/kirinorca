from db.full.database import SessionLocal
from db.full.models import Patient
from orcalib.or_patient import get_list

sess = SessionLocal


def init_data():
    data = get_list()
    sess.execute(Patient.__table__.insert(), data)
    sess.commit()
