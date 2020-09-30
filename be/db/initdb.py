from serve.model.models import Acceptance, Patient

from db.database import Base, engine, init, session

init()
session = session()

Base.metadata.create_all(bind=engine())


print("aaa")
if session is not None:
    print("bbb")
    pati = Patient(pati_id="99999")
    session.add(pati)
    pati2 = Patient(pati_id="99998")
    session.add(pati2)

    acc1 = Acceptance(
        acc_id="99999", acc_date="1900-01-01", acc_time="00:00", pati_id="99999"
    )
    session.add(acc1)
    acc2 = Acceptance(
        acc_id="99998", acc_date="1900-01-01", acc_time="00:01", pati_id="99998"
    )
    session.add(acc2)
    session.commit()
