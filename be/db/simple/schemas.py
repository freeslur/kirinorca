import graphene
from db.simple.models import Acceptance as AcceptanceModel
from db.simple.models import Patient as PatientModel
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType


class Patient(SQLAlchemyObjectType):
    class Meta:
        model = PatientModel
        interfaces = (relay.Node,)


class PatientConnections(relay.Connection):
    class Meta:
        node = Patient


class Acceptance(SQLAlchemyObjectType):
    class Meta:
        model = AcceptanceModel
        interfaces = (relay.Node,)


class AcceptanceConnections(relay.Connection):
    class Meta:
        node = Acceptance


class Query(graphene.ObjectType):
    node = relay.Node.Field()

    all_acceptances = SQLAlchemyConnectionField(AcceptanceConnections)
    all_patients = SQLAlchemyConnectionField(PatientConnections)


schema = graphene.Schema(query=Query)
