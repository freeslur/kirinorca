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

export const SEARCH_PATIENT_GQ = (
  patiId = '',
  sei = '',
  mei = '',
  seiKana = '',
  meiKana = '',
  birth = ''
) => {
  return `{
  newPatiList(startDate: "${patiId}",endDate: "${sei}") {
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

export const ALL_PATIENTS_GQ = `{
    allPatients{
      edges{
        node{
          patiId
          sei
          mei
          seiKana
          meiKana
          birth
          sex
        }
      }
    }
  }`;
