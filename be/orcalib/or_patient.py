from datetime import datetime

from utils.date import date_to_string

import orcalib.or_default as orca
from orcalib.or_utils import get_request, post_request, req_to_xml


class ORPatient:
    def __init__(self, pati_id):
        self.pati_id = pati_id

    def get_info(self):
        result = get_request(
            api_uri=orca.patient_basic_info,
            res_key="patientinfores",
            params="id=" + self.pati_id,
        )
        return result

    def get_prev_date(self):
        patient_data = self.get_info()
        result = (
            patient_data["Patient_Information"]["LastVisit_Date"]
            if "LastVisit_Date" in patient_data["Patient_Information"].keys()
            else "初診"
        )
        return result

    def checks(self):
        return ""

    def regist(self):
        return "res"


def get_list():
    result = []
    for d in range(10):
        d = d * 100
        p_data = {
            "Patient_ID_Information": [
                {"Patient_ID": str(dd)} for dd in range(d, d + 100)
            ]
        }
        post_data = req_to_xml(req_key="patientlst2req", req_data=p_data)

        json_data = post_request(
            api_uri=orca.patient_list, res_key="patientlst2res", post_data=post_data
        )
        if int(json_data["Target_Patient_Count"]) == 0:
            break
        for data in json_data["Patient_Information"]:
            if "WholeName_inKana" in data.keys():
                name = data["WholeName"].split("　")
                name_kana = data["WholeName_inKana"].split("　")
                result.append(
                    {
                        "birth": data["BirthDate"],
                        "pati_id": data["Patient_ID"],
                        "sex": data["Sex"],
                        "sei": name[0],
                        "mei": name[1] if len(name) > 1 else "",
                        "sei_kana": name_kana[0],
                        "mei_kana": name_kana[1] if len(name_kana) > 1 else "",
                        "reg_date": date_to_string(datetime.now()),
                        "mod_date": date_to_string(datetime.now()),
                    }
                )

    return result


def get_new_list(start_date, end_date):
    result = []
    p_data = {
        "Base_StartDate": start_date,
        "Base_EndDate": end_date,
    }
    post_data = req_to_xml(req_key="patientlst1req", req_data=p_data)

    json_data = post_request(
        api_uri=orca.patient_new, res_key="patientlst1res", post_data=post_data
    )
    if "Patient_Information" in json_data.keys():
        for data in json_data["Patient_Information"]:
            name = data["WholeName"].split("　")
            name_kana = data["WholeName_inKana"].split("　")
            result.append(
                {
                    "birth": data["BirthDate"],
                    "pati_id": data["Patient_ID"],
                    "sex": data["Sex"],
                    "sei": name[0] if len(name) > 0 else "",
                    "mei": name[1] if len(name) > 1 else "",
                    "sei_kana": name_kana[0] if len(name_kana) > 0 else "",
                    "mei_kana": name_kana[1] if len(name_kana) > 1 else "",
                    "reg_date": data["CreateDate"],
                    "mod_date": data["UpdateDate"],
                }
            )
    return result
