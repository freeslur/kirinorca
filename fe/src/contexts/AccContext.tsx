import React, { createContext, useContext, useState } from 'react';

type ChangeStatusType = {
  index?: number;
  acc_id?: string;
  acc_date?: string;
  acc_time?: string;
  pati_id?: string;
  code?: number;
};

type PublicInsuranceInformationType = {
  PublicInsurance_Class?: string;
  PublicInsurance_Name?: string;
  PublicInsurer_Number?: string;
  PublicInsuredPerson_Number?: string;
  Certificate_IssuedDate?: string;
  Certificate_ExpiredDate?: string;
};

type HealthInsuranceInformationType = {
  Insurance_Combination_Number?: string;
  InsuranceProvider_Class?: string;
  InsuranceProvider_Number?: string;
  InsuranceProvider_WholeName?: string;
  HealthInsuredPerson_Symbol?: string;
  HealthInsuredPerson_Number?: string;
  HealthInsuredPerson_Continuation?: string;
  HealthInsuredPerson_Assistance?: string;
  RelationToInsuredPerson?: string;
  HealthInsuredPerson_WholeName?: string;
  Certificate_StartDate?: string;
  Certificate_ExpiredDate?: string;
  PublicInsuranceInformation?: PublicInsuranceInformationType;
};

type MedicationinfoType = {
  Medication_Code: string;
  Medication_Name: string;
  Medication_Number: string;
  Medication_Generic_Flg: string;
};

type MedicalInformationType = {
  Medical_Class: string;
  Medical_Class_Name: string;
  Medical_Class_Number: string;
  Medication_info?: MedicationinfoType[];
};

type DiseaseInformationType = {
  Disease_Code?: string;
  Disease_Name?: string;
  Disease_Single?: {
    Disease_Single_Code: string;
    Disease_Single_Name: string;
  }[];
  Disease_Supplement?: {
    Disease_Scode1?: string;
    Disease_Scode2?: string;
    Disease_Scode3?: string;
    Disease_Sname?: string;
  };
  Disease_Category?: string;
  Disease_SuspectedFlag?: string;
  Disease_StartDate: string;
  Disease_EndDate: string;
  Disease_OutCome?: string;
};

type DiagnosisInformationType = {
  Department_Code: string;
  Physician_Code: string;
  HealthInsurance_Information: HealthInsuranceInformationType;
  Medical_Information: MedicalInformationType[];
  Disease_Information: DiseaseInformationType[];
};

type AccountType = {
  Patient_ID: string;
  Perform_Date?: string;
  Perform_Time?: string;
  DiagnosisInformation: DiagnosisInformationType;
};

type AccContextType = {
  state: {
    searched: boolean;
    detailP: boolean;
    openNew: boolean;
    openNewAcc: boolean;
    fromAccList: boolean;
    changeStatus: ChangeStatusType;
    newbieData: any;
    allPatiData: any;
    allAccData: any;
    allPhysData: any;
    allDepartData: any;
    patiDetailId: string;
    detailData: any;
    accountData: any;
  };
  actions: {
    setSearched: (flag: boolean) => void;
    setDetailP: (flag: boolean) => void;
    setOpenNew: (flag: boolean) => void;
    setOpenNewAcc: (flag: boolean) => void;
    setFromAccList: (flag: boolean) => void;
    setChangeStatus: ({
      index,
      acc_id,
      acc_date,
      acc_time,
      pati_id,
      code,
    }: ChangeStatusType) => void;
    setNewbieData: (data: any) => void;
    setAllPatiData: (data: any) => void;
    setAllAccData: (data: any) => void;
    setAllPhysData: (data: any) => void;
    setAllDepartData: (data: any) => void;
    setPatiDetailId: (patiId: string) => void;
    setDetailData: (data: any) => void;
    setAccoutData: (data: any) => void;
  };
};

const AccContext = createContext<AccContextType>({
  state: {
    searched: false,
    detailP: false,
    openNew: false,
    openNewAcc: false,
    fromAccList: false,
    changeStatus: {
      index: -1,
      acc_id: '',
      acc_date: '',
      acc_time: '',
      pati_id: '',
      code: -1,
    },
    newbieData: [],
    allPatiData: [],
    allAccData: [],
    allPhysData: [],
    allDepartData: [],
    patiDetailId: '',
    detailData: '',
    accountData: {},
  },
  actions: {
    setSearched: () => {},
    setDetailP: () => {},
    setOpenNew: () => {},
    setOpenNewAcc: () => {},
    setFromAccList: () => {},
    setChangeStatus: () => {},
    setNewbieData: () => {},
    setAllPatiData: () => {},
    setAllAccData: () => {},
    setAllPhysData: () => {},
    setAllDepartData: () => {},
    setPatiDetailId: () => {},
    setDetailData: () => {},
    setAccoutData: () => {},
  },
});

export const AccContextProvider: React.FC = ({ children }) => {
  const [searched, setSearched] = useState(false);
  const [detailP, setDetailP] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [openNewAcc, setOpenNewAcc] = useState(false);
  const [fromAccList, setFromAccList] = useState(false);
  const [changeStatus, setChangeStatus] = useState<ChangeStatusType>({
    index: -1,
    acc_id: '',
    acc_date: '',
    acc_time: '',
    pati_id: '',
    code: -1,
  });
  const [newbieData, setNewbieData] = useState([]);
  const [allPatiData, setAllPatiData] = useState([]);
  const [allAccData, setAllAccData] = useState([]);
  const [allPhysData, setAllPhysData] = useState([]);
  const [allDepartData, setAllDepartData] = useState([]);
  const [patiDetailId, setPatiDetailId] = useState('');
  const [detailData, setDetailData] = useState({});
  const [accountData, setAccountData] = useState({});

  const value: AccContextType = {
    state: {
      searched: searched,
      detailP: detailP,
      openNew: openNew,
      openNewAcc: openNewAcc,
      fromAccList: fromAccList,
      changeStatus: changeStatus,
      newbieData: newbieData,
      allPatiData: allPatiData,
      allAccData: allAccData,
      allPhysData: allPhysData,
      allDepartData: allDepartData,
      patiDetailId: patiDetailId,
      detailData: detailData,
      accountData: accountData,
    },
    actions: {
      setSearched: setSearched,
      setDetailP: setDetailP,
      setOpenNew: setOpenNew,
      setOpenNewAcc: setOpenNewAcc,
      setFromAccList: setFromAccList,
      setChangeStatus: setChangeStatus,
      setNewbieData: setNewbieData,
      setAllPatiData: setAllPatiData,
      setAllAccData: setAllAccData,
      setAllPhysData: setAllPhysData,
      setAllDepartData: setAllDepartData,
      setPatiDetailId: setPatiDetailId,
      setDetailData: setDetailData,
      setAccoutData: setAccountData,
    },
  };
  return <AccContext.Provider value={value}>{children}</AccContext.Provider>;
};

// export const { Consumer: AccDateContextConsumer } = AccDateContext;

export const useAccContext = () => {
  const state = useContext(AccContext);
  if (!state) {
    throw new Error('useAccContext Error!!!!');
  }
  return state;
};
