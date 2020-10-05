from db.full.models import AccPubInsurance as AccPubInsuranceModel
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType


# PubInsurance
class AccPubInsurance(SQLAlchemyObjectType):
    class Meta:
        model = AccPubInsuranceModel
        interfaces = (relay.Node,)


class AccPubInsuranceConnections(relay.Connection):
    class Meta:
        node = AccPubInsurance
