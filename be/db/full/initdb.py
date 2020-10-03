from db.full.database import BaseF, SessionLocalF, engine_f
from db.full.models import Acceptance, Patient

sessionF = SessionLocalF

BaseF.metadata.create_all(bind=engine_f)


print("aaa")
if sessionF is not None:
    print("bbb")
    pati = Patient(pati_id="99999")
    sessionF.add(pati)
    pati2 = Patient(pati_id="99998")
    sessionF.add(pati2)

    acc1 = Acceptance(
        acc_id="99999", acc_date="1900-01-01", acc_time="00:00", pati_id="99999"
    )
    sessionF.add(acc1)
    acc2 = Acceptance(
        acc_id="99998", acc_date="1900-01-01", acc_time="00:01", pati_id="99998"
    )
    sessionF.add(acc2)
    sessionF.commit()
