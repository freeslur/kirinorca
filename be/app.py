from typing import Dict

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from starlette.graphql import GraphQLApp

import orcalib.or_default as orca
from db.full import database
from db.full.schema import schema
from orcalib.or_patient import ORPatient
from orcalib.or_utils import post_request, req_to_xml

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

database.Base.metadata.create_all(bind=database.engine)


class AccountData(BaseModel):
    data: Dict


@app.get("/")
async def home():
    return {"msg": "hello"}


@app.post("/sendaccount")
async def sendaccount(data: AccountData):
    res_data = data.data
    receip_data = {
        "Patient_ID": res_data["patiId"],
        "Perform_Date": res_data["date"],
        "Perform_Time": res_data["time"],
        "Diagnosis_Information": {
            "Department_Code": res_data["departCode"],
            "Physician_Code": res_data["physicCode"],
        },
    }
    orp = ORPatient(pati_id=res_data["patiId"])
    p_info = orp.get_info()
    receip_data["Diagnosis_Information"]["HealthInsurance_Information"] = p_info[
        "Patient_Information"
    ]["HealthInsurance_Information"][0]
    receip_data["Diagnosis_Information"]["Medical_Information"] = [
        {
            "Medical_Class": "120",
            "Medical_Class_Name": "再診",
            "Medical_Class_Number": "1",
            "Medication_info": [
                {
                    "Medication_Code": "112007410",
                    "Medication_Name": "再診",
                    "Medication_Number": "1",
                    "Medication_Generic_Flg": "",
                },
            ],
        },
        {
            "Medical_Class": "210",
            "Medical_Class_Name": "内服薬剤",
            "Medical_Class_Number": "1",
            "Medication_info": [
                {
                    "Medication_Code": "620001402",
                    "Medication_Name": "グリセリン",
                    "Medication_Number": "2",
                    "Medication_Generic_Flg": "yes",
                },
            ],
        },
        {
            "Medical_Class": "500",
            "Medical_Class_Name": "手術",
            "Medical_Class_Number": "1",
            "Medication_info": [
                {
                    "Medication_Code": "150003110",
                    "Medication_Name": "皮膚、皮下腫瘍摘出術（露出部）（長径２ｃｍ未満）",
                    "Medication_Number": "1",
                    "Medication_Generic_Flg": "",
                },
                {
                    "Medication_Code": "641210099",
                    "Medication_Name": "キシロカイン注射液１％",
                    "Medication_Number": "3",
                    "Medication_Generic_Flg": "",
                },
                {
                    "Medication_Code": "840000042",
                    "Medication_Name": "手術○日",
                    "Medication_Number": "15",
                    "Medication_Generic_Flg": "",
                },
            ],
        },
    ]
    receip_data["Disease_Information"] = [
        {
            "Disease_Code": "8830052",
            "Disease_Name": "ＡＣバイパス術後機械的合併症",
            "Disease_SuspectedFlag": "S",
            "Disease_StartDate": "2020-08-23",
            "Disease_EndDate": "2020-08-24",
            "Disease_OutCome": "D",
        },
        {
            "Disease_InOut": "0",
            "Disease_Single": [
                {"Disease_Single_Code": "830417", "Disease_Single_Name": ""},
                {"Disease_Single_Code": "ZZZ8002", "Disease_Single_Name": "の疑い"},
            ],
            "Disease_StartDate": "2020-07-23",
            "Disease_EndDate": "2020-07-24",
            "Disease_OutCome": "D",
        },
    ]

    post_data = req_to_xml(req_key="medicalreq", req_data=receip_data)

    result = {}
    error = ""

    json_data = post_request(
        api_uri=orca.regist_receipt, res_key="medicalres", post_data=post_data
    )
    if json_data["Api_Result"] == "00":
        result = json_data
        error = "00"

    else:
        error = json_data["Api_Result"] + " : " + json_data["Api_Result_Message"]

    result = {"data": json_data, "error": error}
    print(result)
    return result


app.add_route("/gql", GraphQLApp(schema=schema))


@app.on_event("shutdown")
def shutdown_event():
    print("Shutdown")
    database.SessionLocalF.remove()


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5000, log_level="debug", reload=True)
