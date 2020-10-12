from db.full.models import Physician as PhysicianModel
from graphene import String, relay
from graphene_sqlalchemy import SQLAlchemyObjectType


class PhysicianAttribute:
    code = String(description="Physician Code")
    name = String(description="Physician Name")
    depart_code1 = String(description="Department Code")
    depart_code2 = String(description="Department Code")


# Physician
class Physician(SQLAlchemyObjectType, PhysicianAttribute):
    class Meta:
        model = PhysicianModel
        interfaces = (relay.Node,)


class PhysicianConnections(relay.Connection):
    class Meta:
        node = Physician
