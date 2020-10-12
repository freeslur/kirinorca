from datetime import datetime

from utils.date import date_to_string

import orcalib.or_default as orca
from orcalib.or_utils import post_request, req_to_xml


class ORSystem:
    def __init__(self, system_code):
        self.system_code = system_code

    def get_info(self):
        p_data = {
            "Request_Number": self.system_code,
            "Base_Date": date_to_string(datetime.now()),
        }
        api_uri = (
            orca.department_info if self.system_code == "01" else orca.physician_info
        )

        post_data = req_to_xml(req_key="system01_managereq", req_data=p_data)

        res_key = "departmentres" if self.system_code == "01" else "physicianres"

        json_data = post_request(api_uri=api_uri, res_key=res_key, post_data=post_data)
        result = (
            [
                {"code": dd["Code"], "name": dd["WholeName"]}
                for dd in json_data["Department_Information"]
            ]
            if self.system_code == "01"
            else [
                {
                    "code": dd["Code"],
                    "name": dd["WholeName"],
                    "depart_code1": dd["Department_Code1"]
                    if "Department_Code1" in dd.keys()
                    else "",
                    "depart_code2": dd["Department_Code2"]
                    if "Department_Code2" in dd.keys()
                    else "",
                }
                for dd in json_data["Physician_Information"]
            ]
        )

        return result
