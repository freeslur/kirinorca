from db.full.models import AccPubInsurance as AccPubInsuranceModel
from graphene import Int, String, relay
from graphene_sqlalchemy import SQLAlchemyObjectType


class AccPubInsuranceAttribute:
    acc_ins_id = Int()
    pub_class = String()
    pub_no = String()
    pub_name = String()
    pub_per_no = String()
    rate_adm = String()
    money_adm = String()
    rate_outpati = String()
    money_outpati = String()
    cert_idate = String()
    cert_exp_date = String()


# PubInsurance
class AccPubInsurance(SQLAlchemyObjectType, AccPubInsuranceAttribute):
    class Meta:
        model = AccPubInsuranceModel
        interfaces = (relay.Node,)


class AccPubInsuranceConnections(relay.Connection):
    class Meta:
        node = AccPubInsurance
