from db.full.models import Department as DepartmentModel
from graphene import String, relay
from graphene_sqlalchemy import SQLAlchemyObjectType


class DepartmentAttribute:
    code = String(description="Department Code")
    name = String(description="Department Name")


# Department
class Department(SQLAlchemyObjectType, DepartmentAttribute):
    class Meta:
        model = DepartmentModel
        interfaces = (relay.Node,)


class DepartmentConnections(relay.Connection):
    class Meta:
        node = Department
