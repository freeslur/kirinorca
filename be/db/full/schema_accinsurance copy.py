from db.full.models import AccInsurance as AccInsuranceModel
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType


# AccInsurance
class AccInsurance(SQLAlchemyObjectType):
    class Meta:
        model = AccInsuranceModel
        interfaces = (relay.Node,)


class AccInsuranceConnections(relay.Connection):
    class Meta:
        node = AccInsurance
