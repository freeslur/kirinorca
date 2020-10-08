from db.full.models import Acceptance as AcceptanceModel
from graphene import String, relay
from graphene_sqlalchemy import SQLAlchemyObjectType


class AcceptanceAttribute:
    date = String()
    time = String()
    pati_id = String()
    pati_sei = String()
    pati_mei = String()
    pati_sei_kana = String()
    pati_mei_kana = String()
    pati_birth = String()
    pati_sex = String()
    status = String()
    depart_code = String()
    depart_name = String()
    physic_code = String()
    physic_name = String()
    appoint_id = String()
    appoint_time = String()
    account_time = String()
    medi_contents = String()
    place = String()
    memo = String()
    insurances = relationship("AccInsurance", backref="acceptances")


# Acceptance
class Acceptance(SQLAlchemyObjectType, AcceptanceAttribute):
    class Meta:
        model = AcceptanceModel
        interfaces = (relay.Node,)


class AcceptanceConnections(relay.Connection):
    class Meta:
        node = Acceptance
