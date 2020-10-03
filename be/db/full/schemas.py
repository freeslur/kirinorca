import graphene
from db.full.models import Acceptance as AcceptanceModel
from db.full.models import AccInsurance as AccInsuranceModel
from db.full.models import Department as DepartmentModel
from db.full.models import Patient as PatientModel
from db.full.models import Physician as PhysicianModel
from db.full.models import PubInsurance as PubInsuranceModel
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType


# Patient
class Patient(SQLAlchemyObjectType):
    class Meta:
        model = PatientModel
        interfaces = (relay.Node,)


class PatientConnections(relay.Connection):
    class Meta:
        node = Patient


# Acceptance
class Acceptance(SQLAlchemyObjectType):
    class Meta:
        model = AcceptanceModel
        interfaces = (relay.Node,)


class AcceptanceConnections(relay.Connection):
    class Meta:
        node = Acceptance


# AccInsurance
class AccInsurance(SQLAlchemyObjectType):
    class Meta:
        model = AccInsuranceModel
        interfaces = (relay.Node,)


class AccInsuranceConnections(relay.Connection):
    class Meta:
        node = AccInsurance


# PubInsurance
class PubInsurance(SQLAlchemyObjectType):
    class Meta:
        model = PubInsuranceModel
        interfaces = (relay.Node,)


class PubInsuranceConnections(relay.Connection):
    class Meta:
        node = PubInsurance


# Department
class Department(SQLAlchemyObjectType):
    class Meta:
        model = DepartmentModel
        interfaces = (relay.Node,)


class DepartmentConnections(relay.Connection):
    class Meta:
        node = Department


# Physician
class Physician(SQLAlchemyObjectType):
    class Meta:
        model = PhysicianModel
        interfaces = (relay.Node,)


class PhysicianConnections(relay.Connection):
    class Meta:
        node = Physician


# query
class Query(graphene.ObjectType):
    node = relay.Node.Field()

    all_acceptances = SQLAlchemyConnectionField(AcceptanceConnections)
    all_patients = SQLAlchemyConnectionField(PatientConnections)
    all_departments = SQLAlchemyConnectionField(DepartmentConnections)
    all_physicians = SQLAlchemyConnectionField(PhysicianConnections)


schema = graphene.Schema(query=Query)
