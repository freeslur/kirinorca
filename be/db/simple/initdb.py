from db.simple.database import BaseS, SessionLocalS, engine_s
from db.simple.models import Acceptance, Patient

sessionS = SessionLocalS

BaseS.metadata.create_all(bind=engine_s)


print("aaa")
if sessionS is not None:
    print("bbb")
    pati = Patient(pati_id="99999")
    sessionS.add(pati)
    pati2 = Patient(pati_id="99998")
    sessionS.add(pati2)

    acc1 = Acceptance(
        acc_id="99999", acc_date="1900-01-01", acc_time="00:00", pati_id="99999"
    )
    sessionS.add(acc1)
    acc2 = Acceptance(
        acc_id="99998", acc_date="1900-01-01", acc_time="00:01", pati_id="99998"
    )
    sessionS.add(acc2)
    sessionS.commit()
