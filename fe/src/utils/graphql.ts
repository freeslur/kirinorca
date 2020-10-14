export const NEW_PATIENT_GQ = (startDate: string, endDate: string) => {
  return `{
  newPatiList(startDate: "${startDate}",endDate: "${endDate}") {
    patiId
    sei
    mei
    seiKana
    meiKana
    birth
    sex
    regDate
  }
}`;
};

export const PATIENT_DETAIL_GQ = (patiId: string) => {
  return `{
  patiDetail(patiId: "${patiId}") {
    data
  }
}`;
};

export const REGIST_ACCEPTANCE_GQ = (data: any) => {
  return `mutation{
    addAcceptance(accData: {date:"${data.date}",
          time:"${data.time}",
          patiId:"${data.pati_id}",
          patiSei:"${data.pati_sei}",
          patiMei:"${data.pati_mei}",
          patiSeiKana:"${data.pati_sei_kana}",
          patiMeiKana:"${data.pati_mei_kana}",
          patiBirth:"${data.pati_birth}",
          patiSex:"${data.pati_sex}",
          status:"${data.status}",
          departCode:"${data.depart_code}",
          departName:"${data.depart_name}",
          physicCode:"${data.physic_code}",
          physicName:"${data.physic_name}",
          mediContents:"${data.medi_contents}",
          place:"${data.place}"}){
            acceptance{
              accId
              date
            }
    }
  }`;
};

export const GET_PHYSICIAN_GQ = (phys: string[]) => {
  return `{
  getPhysician(code: [${phys}]) {
    code
    name
    departCode1
    depart1 {
      code
      name
    }
    departCode2
    depart2 {
      code
      name
    }
  }
}`;
};

export const GET_DEPARTMENT_GQ = (phys: string[]) => {
  return `{
  getDepartment(code: [${phys}]) {
    code
    name
  }
}`;
};

export const ALL_PATIENTS_GQ = `{
    patients{
      patiId
      sei
      mei
      seiKana
      meiKana
      birth
      sex
    }
  }`;

export const ALL_ACCEPTANCES_GQ = `{
  acceptances{
    accId
    date
    time
    patiId
    patiSei
    patiMei
    patiSeiKana
    patiMeiKana
    patiBirth
    patiSex
    status
    departCode
    departName
    physicCode
    physicName
    appointId
    appointTime
    accountTime
    mediContents
    place
    memo
    }
  }`;
