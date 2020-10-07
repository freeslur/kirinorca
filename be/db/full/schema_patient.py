from db.full.models import Patient as PatientModel
from graphene import ObjectType, String, relay
from graphene_sqlalchemy import SQLAlchemyObjectType


class PatientAttribute:
    pati_id = String(description="Patient ID")
    sei = String(description="Patient Sei")
    mei = String(description="Patient Mei")
    sei_kana = String(description="Patient Sei Kana")
    mei_kana = String(description="Patient Mei Kana")
    birth = String(description="Patient Birth Date")
    sex = String(description="Patient Birth Date")
    reg_date = String(description="Patient Birth Date")
    mod_date = String(description="Patient Birth Date")


# Patient
class Patient(SQLAlchemyObjectType, PatientAttribute):
    class Meta:
        model = PatientModel
        interfaces = (relay.Node,)


class ORPatient(ObjectType, PatientAttribute):
    class Meta:
        interfaces = (relay.Node,)


class ORPatiDetail(ObjectType):
    data = String()

    class Meta:
        interfaces = (relay.Node,)


class PatientConnections(relay.Connection):
    class Meta:
        node = Patient
