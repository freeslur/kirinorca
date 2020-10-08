from pprint import pprint

from db.full import database
from db.full.actions.patient_actions import diff_new
from db.full.schema_acceptance import AcceptanceConnections
from db.full.schema_patient import ORPatiDetail, ORPatient, Patient, PatientConnections
from graphene import Field, List, Mutation, ObjectType, Schema, String, relay
from graphene_sqlalchemy import SQLAlchemyConnectionField
from orcalib.or_patient import ORPatient as ORPatientClass
from orcalib.or_patient import get_list

PatientModel = Patient._meta.model

# # Patient
# class Patient(SQLAlchemyObjectType):
#     class Meta:
#         model = PatientModel
#         interfaces = (relay.Node,)


# class PatientConnections(relay.Connection):
#     class Meta:
#         node = Patient


# # Acceptance
# class Acceptance(SQLAlchemyObjectType):
#     class Meta:
#         model = AcceptanceModel
#         interfaces = (relay.Node,)


# class AcceptanceConnections(relay.Connection):
#     class Meta:
#         node = Acceptance


# # AccInsurance
# class AccInsurance(SQLAlchemyObjectType):
#     class Meta:
#         model = AccInsuranceModel
#         interfaces = (relay.Node,)


# class AccInsuranceConnections(relay.Connection):
#     class Meta:
#         node = AccInsurance


# # PubInsurance
# class AccPubInsurance(SQLAlchemyObjectType):
#     class Meta:
#         model = AccPubInsuranceModel
#         interfaces = (relay.Node,)


# class AccPubInsuranceConnections(relay.Connection):
#     class Meta:
#         node = AccPubInsurance


# # Department
# class Department(SQLAlchemyObjectType):
#     class Meta:
#         model = DepartmentModel
#         interfaces = (relay.Node,)


# class DepartmentConnections(relay.Connection):
#     class Meta:
#         node = Department


# # Physician
# class Physician(SQLAlchemyObjectType):
#     class Meta:
#         model = PhysicianModel
#         interfaces = (relay.Node,)


# class PhysicianConnections(relay.Connection):
#     class Meta:
#         node = Physician


# query
class Query(ObjectType):
    node = relay.Node.Field()

    all_acceptances = SQLAlchemyConnectionField(AcceptanceConnections)
    all_patients = SQLAlchemyConnectionField(PatientConnections)
    # all_departments = SQLAlchemyConnectionField(DepartmentConnections)
    # all_physicians = SQLAlchemyConnectionField(PhysicianConnections)
    patients = List(Patient, pati_id=String(required=True))

    def resolve_patients(self, info, **kwargs):
        patient_query = Patient.get_query(info)
        return patient_query.filter(
            PatientModel.pati_id.contains(kwargs.get("pati_id"))
        )

    search_patient = List(Patient)

    def resolve_search_patient(
        self,
        info,
        pati_id="",
        sei="",
        mei="",
        sei_kana="",
        mei_kana="",
        birth="",
        **kwargs
    ):
        query = Patient.get_query(info)
        result = query.filter(
            PatientModel.pati_id.contains(pati_id),
            PatientModel.sei.contains(sei),
            PatientModel.mei.contains(mei),
            PatientModel.sei_kana.contains(sei_kana),
            PatientModel.mei_kana.contains(mei_kana),
            PatientModel.birth.contains(birth),
        ).all()
        return result

    init_pati_data = List(Patient)

    def resolve_init_pati_data(self, info, **kwargs):
        patient_query = Patient.get_query(info)
        result = patient_query.all()
        if len(result) == 0:
            data = get_list()
            sess = database.SessionLocal
            sess.execute(PatientModel.__table__.insert(), data)
            sess.commit()
            result = patient_query.all()
        return result

    new_pati_list = List(
        ORPatient, start_date=String(required=True), end_date=String(required=True)
    )

    def resolve_new_pati_list(self, info, start_date, end_date, **kwargs):
        # patient_query = Patient.get_query(info)
        # result = patient_query.all()
        data = diff_new(start_date, end_date)
        return data

    pati_detail = Field(ORPatiDetail, pati_id=String(required=True))

    def resolve_pati_detail(self, info, pati_id, **kwargs):
        orp = ORPatientClass(pati_id=pati_id)
        d = orp.get_info()
        data = d["Patient_Information"] if "Patient_Information" in d.keys() else {}
        ddata = dict()
        ddata["data"] = data
        print(ddata)
        return ddata


# Mutation
class InsertPatient(Mutation):
    class Arguments:
        pati_id = String(required=True)
        sei = String(required=True)
        mei = String(required=True)
        sei_kana = String(required=True)
        mei_kana = String(required=True)
        birth = String(required=True)
        sex = String(required=True)
        reg_date = String()
        mod_date = String()

    patient = Field(lambda: Patient)

    def mutate(
        self,
        info,
        pati_id,
        sei,
        mei,
        sei_kana,
        mei_kana,
        birth,
        sex,
        reg_date,
        mod_date,
    ):
        patients = PatientModel(
            pati_id=pati_id,
            sei=sei,
            mei=mei,
            sei_kana=sei_kana,
            mei_kana=mei_kana,
            birth=birth,
            sex=sex,
            reg_date=reg_date,
            mod_date=mod_date,
        )
        database.SessionLocal.add(patients)
        database.SessionLocal.commit()
        return InsertPatient(patient=patients)


class InsertAcceptance(Mutation):
    class Arguments:
        pati_id = String(required=True)
        sei = String(required=True)
        mei = String(required=True)
        sei_kana = String(required=True)
        mei_kana = String(required=True)
        birth = String(required=True)
        sex = String(required=True)
        reg_date = String()
        mod_date = String()

    patient = Field(lambda: Patient)

    def mutate(
        self,
        info,
        pati_id,
        sei,
        mei,
        sei_kana,
        mei_kana,
        birth,
        sex,
        reg_date,
        mod_date,
    ):
        patients = PatientModel(
            pati_id=pati_id,
            sei=sei,
            mei=mei,
            sei_kana=sei_kana,
            mei_kana=mei_kana,
            birth=birth,
            sex=sex,
            reg_date=reg_date,
            mod_date=mod_date,
        )
        database.SessionLocal.add(patients)
        database.SessionLocal.commit()
        return InsertPatient(patient=patients)


class Mutation(ObjectType):
    insert_patient = InsertPatient.Field()
    insert_acceptance = InsertAcceptance.Field()


schema = Schema(query=Query, mutation=Mutation, types=[Patient])
