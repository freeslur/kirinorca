from db.full.models import Acceptance as AcceptanceModel
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType


# Acceptance
class Acceptance(SQLAlchemyObjectType):
    class Meta:
        model = AcceptanceModel
        interfaces = (relay.Node,)


class AcceptanceConnections(relay.Connection):
    class Meta:
        node = Acceptance
