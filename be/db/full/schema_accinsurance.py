from db.full.models import AccInsurance as AccInsuranceModel
from graphene import Int, String, relay
from graphene_sqlalchemy import SQLAlchemyObjectType


class AccInsuranceAttribute:

    acc_r_id = Int()
    no = String()
    prov_class = String()
    prov_no = String()
    prov_name = String()
    pers_symb = String()
    pers_no = String()
    relation_to = String()
    pers_name = String()
    cert_sdate = String()
    cert_exp_date = String()
    pub_insures = relationship("AccPubInsurance", backref="accinsurances")


# AccInsurance
class AccInsurance(SQLAlchemyObjectType, AccInsuranceAttribute):
    class Meta:
        model = AccInsuranceModel
        interfaces = (relay.Node,)


class AccInsuranceConnections(relay.Connection):
    class Meta:
        node = AccInsurance
