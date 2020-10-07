from db.full.database import SessionLocal
from db.full.models import Patient
from orcalib.or_patient import get_list, get_new_list
from sqlalchemy import asc, select
from utils.diff import PatiDiff

sess = SessionLocal


def init_data():
    data = get_list()
    sess.execute(Patient.__table__.insert(), data)
    sess.commit()


def diff_new(start_date, end_date):
    diff = PatiDiff()
    ordata = get_new_list(start_date, end_date)
    tab = Patient.__table__.c
    sel = (
        select(
            [
                tab.pati_id,
                tab.sei,
                tab.mei,
                tab.sei_kana,
                tab.mei_kana,
                tab.birth,
                tab.sex,
                tab.reg_date,
                tab.mod_date,
            ]
        )
        .select_from(Patient.__table__)
        .order_by(asc(tab.pati_id))
    )
    dbdata = [
        {
            "pati_id": r[0],
            "sei": r[1],
            "mei": r[2],
            "sei_kana": r[3],
            "mei_kana": r[4],
            "birth": r[5],
            "sex": r[6],
            "reg_date": r[7],
            "mod_date": r[8],
        }
        for r in sess.execute(sel)
    ]
    diff.diff(db_data=dbdata, or_data=ordata)

    # sess.execute(Patient.__table__.update(), diff.changed())
    # sess.commit()
    return diff.added()
