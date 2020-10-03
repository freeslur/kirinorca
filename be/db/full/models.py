import config
from db.full.database import BaseF as Base
from orcalib.or_acceptances import ORAcceptance
from sqlalchemy import Column, ForeignKey, String
from sqlalchemy.sql.sqltypes import Integer


class Acceptance(Base):
    __tablename__ = "acceptances"

    id = Column(Integer, autoincrement=True, primary_key=True)
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


class AccInsurance(Base):
    __tablename__ = "accinsurances"

    id = Column(Integer, autoincrement=True, primary_key=True)
    acc_id = Column(Integer)
    acc_date = Column(String)
    acc_time = Column(String)
    pati_id = Column(String)
    no = Column(String)
    prov_class = Column(String)
    prov_no = Column(String)
    prov_name = Column(String)
    pers_symb = Column(String)
    pers_no = Column(String)
    relation_to = Column(String)
    pers_name = Column(String)
    cert_sdate = Column(String)
    cert_exp_date = Column(String)


class AccPubInsurance(Base):
    __tablename__ = "accpubinsurances"

    id = Column(Integer, autoincrement=True, primary_key=True)
    acc_ins_id = Column(Integer)
    pub_class = Column(String)
    pub_no = Column(String)
    pub_name = Column(String)
    pub_per_no = Column(String)
    rate_adm = Column(String)
    money_adm = Column(String)
    rate_outpati = Column(String)
    money_outpati = Column(String)
    cert_idate = Column(String)
    cert_exp_date = Column(String)


def get_or_acc_data():
    ora = ORAcceptance(acc_date=config.acc_date)
    data = ora.list_all()
    return data


def test():
    return Acceptance.__tablename__


class Patient(Base):
    __tablename__ = "patients"
    id = Column(String(length=255), primary_key=True)
    sei = Column(String)
    mei = Column(String)
    sei_kana = Column(String)
    mei_kana = Column(String)
    birth = Column(String)
    sex = Column(String)
    reg_date = Column(String)
    mod_date = Column(String)


class Department(Base):
    __tablename__ = "departments"
    code = Column(String(length=255), primary_key=True)
    name = Column(String(length=255))


class Physician(Base):
    __tablename__ = "physician"
    code = Column(String(length=255), primary_key=True)
    name = Column(String(length=255))
