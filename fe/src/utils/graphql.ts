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
  return `{
  patiDetail(patiId: "${data}") {
    data
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
