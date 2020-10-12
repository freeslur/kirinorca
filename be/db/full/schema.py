from db.full import database
from db.full.actions.patient_actions import diff_new
from db.full.schema_acceptance import Acceptance, AcceptanceConnections
from db.full.schema_department import Department
from db.full.schema_patient import ORPatiDetail, ORPatient, Patient
from db.full.schema_physician import Physician
from graphene import Field, List, Mutation, ObjectType, Schema, String, relay
from graphene.types.generic import GenericScalar
from graphene_sqlalchemy import SQLAlchemyConnectionField
from orcalib.or_patient import ORPatient as ORPatientClass
from orcalib.or_patient import get_list
from orcalib.or_system import ORSystem

PatientModel = Patient._meta.model
AcceptanceModel = Acceptance._meta.model
DepartmentModel = Department._meta.model
PhysicianModel = Physician._meta.model


# query
class Query(ObjectType):
    node = relay.Node.Field()

    all_acceptances = SQLAlchemyConnectionField(AcceptanceConnections)

    # Patient List
    patients = List(Patient, pati_id=List(String))

    def resolve_patients(self, info, pati_id=[], **kwargs):
        query = Patient.get_query(info)
        result = (
            query.filter(
                PatientModel.pati_id.in_(pati_id),
            ).all()
            if len(pati_id) != 0
            else query.all()
        )
        return result

    # New Patient List
    new_pati_list = List(
        ORPatient, start_date=String(required=True), end_date=String(required=True)
    )

    def resolve_new_pati_list(self, info, start_date, end_date, **kwargs):
        data = diff_new(start_date, end_date)
        return data

    # Patient Detail
    pati_detail = Field(ORPatiDetail, pati_id=String(required=True))

    def resolve_pati_detail(self, info, pati_id, **kwargs):
        orp = ORPatientClass(pati_id=pati_id)
        p_info = orp.get_info()
        data = (
            p_info["Patient_Information"]
            if "Patient_Information" in p_info.keys()
            else {}
        )
        return {"data": data}

    #
    #
    # Department

    get_department = List(Department, code=List(String))

    def resolve_get_department(self, info, code=[], **kwargs):
        query = Department.get_query(info)
        result = (
            query.filter(
                DepartmentModel.code.in_(code),
            ).all()
            if len(code) != 0
            else query.all()
        )
        return result

    #
    #
    # Physician

    get_physician = List(Physician, code=List(String))

    def resolve_get_physician(self, info, code=[], **kwargs):
        query = Physician.get_query(info)
        result = (
            query.filter(
                PhysicianModel.code.in_(code),
            ).all()
            if len(code) != 0
            else query.all()
        )
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
        date = String(required=True)
        time = String(required=True)
        pati_id = String(required=True)
        pati_sei = String(required=True)
        pati_mei = String(required=True)
        pati_sei_kana = String(required=True)
        pati_mei_kana = String(required=True)
        pati_birth = String(required=True)
        pati_sex = String(required=True)
        status = String()
        depart_code = String(required=True)
        depart_name = String()
        physic_code = String(required=True)
        physic_name = String()
        appoint_id = String()
        appoint_time = String()
        account_time = String()
        medi_contents = String()
        place = String()
        memo = String()
        insurance = GenericScalar(required=True)

    acceptance = Field(lambda: Acceptance)

    def mutate(
        self,
        info,
        date,
        time,
        pati_id,
        pati_sei,
        pati_mei,
        pati_sei_kana,
        pati_mei_kana,
        pati_birth,
        pati_sex,
        status,
        depart_code,
        depart_name,
        physic_code,
        physic_name,
        appoint_id,
        appoint_time,
        account_time,
        medi_contents,
        place,
        memo,
        insurance,
    ):
        acceptances = AcceptanceModel(
            date=date,
            time=time,
            pati_id=pati_id,
            pati_sei=pati_sei,
            pati_mei=pati_mei,
            pati_sei_kana=pati_sei_kana,
            pati_mei_kana=pati_mei_kana,
            pati_birth=pati_birth,
            pati_sex=pati_sex,
            status=status,
            depart_code=depart_code,
            depart_name=depart_name,
            physic_code=physic_code,
            physic_name=physic_name,
            appoint_id=appoint_id,
            appoint_time=appoint_time,
            account_time=account_time,
            medi_contents=medi_contents,
            place=place,
            memo=memo,
            insurance=insurance,
        )
        database.SessionLocal.add(acceptances)
        database.SessionLocal.commit()
        return InsertAcceptance(acceptance=acceptances)


class Mutation(ObjectType):
    insert_patient = InsertPatient.Field()
    insert_acceptance = InsertAcceptance.Field()

    # Initialize Data
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

    init_depart_data = List(Department)

    def resolve_init_depart_data(self, info, **kwargs):
        depart_query = Department.get_query(info)
        result = depart_query.all()
        if len(result) == 0:
            ors = ORSystem(system_code="01")
            data = ors.get_info()
            sess = database.SessionLocal
            sess.execute(DepartmentModel.__table__.insert(), data)
            sess.commit()
            result = depart_query.all()
        return result

    init_phys_data = List(Physician)

    def resolve_init_phys_data(self, info, **kwargs):
        phys_query = Physician.get_query(info)
        result = phys_query.all()
        if len(result) == 0:
            ors = ORSystem(system_code="02")
            data = ors.get_info()
            sess = database.SessionLocal
            sess.execute(PhysicianModel.__table__.insert(), data)
            sess.commit()
            result = phys_query.all()
        return result


schema = Schema(query=Query, mutation=Mutation, types=[Patient, Acceptance])
