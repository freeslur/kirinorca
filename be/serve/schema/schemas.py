import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType
from serve.model.models import Acceptance as AcceptanceModel
from serve.model.models import Patient as PatientModel


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
