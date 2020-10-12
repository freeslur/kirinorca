import config
from db.full.database import Base
from orcalib.or_acceptances import ORAcceptance
from sqlalchemy import JSON, BigInteger, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship


class Acceptance(Base):
    __tablename__ = "acceptances"

    acc_id = Column(
        BigInteger().with_variant(Integer, "sqlite"),
        primary_key=True,
    )
    date = Column(String, primary_key=True)
    time = Column(String)
    pati_id = Column(String)
    pati_sei = Column(String)
    pati_mei = Column(String)
    pati_sei_kana = Column(String)
    pati_mei_kana = Column(String)
    pati_birth = Column(String)
    pati_sex = Column(String)
    status = Column(String)
    depart_code = Column(String)
    depart_name = Column(String)
    physic_code = Column(String)
    physic_name = Column(String)
    appoint_id = Column(String)
    appoint_time = Column(String)
    account_time = Column(String)
    medi_contents = Column(String)
    place = Column(String)
    memo = Column(String)
    insurance = Column(JSON)


def get_or_acc_data():
    ora = ORAcceptance(acc_date=config.acc_date)
    data = ora.list_all()
    return data


def test():
    return Acceptance.__tablename__


class Patient(Base):
    __tablename__ = "patients"
    pati_id = Column(String(length=255), primary_key=True)
    sei = Column(String)
    mei = Column(String)
    sei_kana = Column(String)
    mei_kana = Column(String)
    birth = Column(String)
    sex = Column(String)
    reg_date = Column(String)
    mod_date = Column(String)
    last_visit_date = Column(String)

    def full_name(self):
        return "{self.sei}　{self.mei}"

    def full_name_kana(self):
        return "{self.sei_kana}　{self.mei_kana}"


class Department(Base):
    __tablename__ = "departments"
    code = Column(String, primary_key=True)
    name = Column(String)


class Physician(Base):
    __tablename__ = "physician"
    code = Column(String, primary_key=True)
    name = Column(String)
    depart_code1 = Column(String, ForeignKey("departments.code"))
    depart1 = relationship("Department", foreign_keys=[depart_code1])
    depart_code2 = Column(String, ForeignKey("departments.code"))
    depart2 = relationship("Department", foreign_keys=[depart_code2])
    # depart_code2 = Column(String, ForeignKey("departments.code"))
    # depart2 = relationship("Department", back_populates="physician")
