from db.full import database
from db.full.schema_acceptance import AcceptanceConnections
from db.full.schema_patient import Patient, PatientConnections
from graphene import Field, List, Mutation, ObjectType, Schema, String, relay
from graphene_sqlalchemy import SQLAlchemyConnectionField

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

    search_patient = List(
        Patient,
        pati_id=String(),
        sei=String(),
        mei=String(),
        sei_kana=String(),
        mei_kana=String(),
        birth=String(),
    )

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
        last_visit_date = String()

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
        last_visit_date,
    ):
        patients = Patient._meta.model(
            pati_id=pati_id,
            sei=sei,
            mei=mei,
            sei_kana=sei_kana,
            mei_kana=mei_kana,
            birth=birth,
            sex=sex,
            reg_date=reg_date,
            mod_date=mod_date,
            last_visit_date=last_visit_date,
        )
        database.SessionLocal.add(patients)
        database.SessionLocal.commit()
        return InsertPatient(patient=patients)


class Mutation(ObjectType):
    insert_patient = InsertPatient.Field()
    check_patient = List(
        Patient,
        pati_id=String(),
        sei=String(),
        mei=String(),
        sei_kana=String(),
        mei_kana=String(),
        birth=String(),
    )

    def resolve_check_patient(self, info, **kwargs):
        query = Patient.get_query(info)
        r = query.all()
        if len(r) == 0:
            print("pass")
        return r


schema = Schema(query=Query, mutation=Mutation, types=[Patient])
