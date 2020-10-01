import config
from db.simple.database import BaseS as Base
from orcalib.or_acceptances import ORAcceptance
from sqlalchemy import Column, String


class Acceptance(Base):
    __tablename__ = "acceptances"

    Acceptance_ID = Column(String, primary_key=True)
    Acceptance_Date = Column(String, primary_key=True)
    Acceptance_Time = Column(String)
    Medical_Content = Column(String)
    Status = Column(String)
    Patient_ID = Column(String)
    Patient_Place = Column(String)
    Acceptance_Memo = Column(String)


def get_or_acc_data():
    ora = ORAcceptance(acc_date=config.acc_date)
    data = ora.list_all()
    return data


def test():
    return Acceptance.__tablename__


class Patient(Base):
    __tablename__ = "patients"
    Patient_ID = Column(String(length=255), primary_key=True)
    Patient_Memo = Column(String(length=255))
