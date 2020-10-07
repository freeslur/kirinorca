import React, { createContext, useContext, useState } from 'react';

type ChangeStatusType = {
  index?: number;
  acc_id?: string;
  acc_date?: string;
  acc_time?: string;
  pati_id?: string;
  code?: number;
};

type AccContextType = {
  state: {
    searched: boolean;
    detailP: boolean;
    openNew: boolean;
    openNewAcc: boolean;
    changeStatus: ChangeStatusType;
    newbieData: any;
    allPatiData: any;
    patiDetailId: string;
  };
  actions: {
    setSearched: (flag: boolean) => void;
    setDetailP: (flag: boolean) => void;
    setOpenNew: (flag: boolean) => void;
    setOpenNewAcc: (flag: boolean) => void;
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
    setPatiDetailId: (patiId: string) => void;
  };
};

const AccContext = createContext<AccContextType>({
  state: {
    searched: false,
    detailP: false,
    openNew: false,
    openNewAcc: false,
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
    patiDetailId: '',
  },
  actions: {
    setSearched: () => {},
    setDetailP: () => {},
    setOpenNew: () => {},
    setOpenNewAcc: () => {},
    setChangeStatus: () => {},
    setNewbieData: () => {},
    setAllPatiData: () => {},
    setPatiDetailId: () => {},
  },
});

export const AccContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searched, setSearched] = useState(false);
  const [detailP, setDetailP] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [openNewAcc, setOpenNewAcc] = useState(false);
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
  const [patiDetailId, setPatiDetailId] = useState('');

  const value: AccContextType = {
    state: {
      searched: searched,
      detailP: detailP,
      openNew: openNew,
      openNewAcc: openNewAcc,
      changeStatus: changeStatus,
      newbieData: newbieData,
      allPatiData: allPatiData,
      patiDetailId: patiDetailId,
    },
    actions: {
      setSearched: setSearched,
      setDetailP: setDetailP,
      setOpenNew: setOpenNew,
      setOpenNewAcc: setOpenNewAcc,
      setChangeStatus: setChangeStatus,
      setNewbieData: setNewbieData,
      setAllPatiData: setAllPatiData,
      setPatiDetailId: setPatiDetailId,
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
