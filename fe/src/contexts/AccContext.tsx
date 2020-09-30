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
  },
  actions: {
    setSearched: () => {},
    setDetailP: () => {},
    setOpenNew: () => {},
    setOpenNewAcc: () => {},
    setChangeStatus: () => {},
  },
});

export const AccContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searched, setSearched] = useState(false);
  const [detailP, setDetailP] = useState(true);
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
  const value: AccContextType = {
    state: {
      searched: searched,
      detailP: detailP,
      openNew: openNew,
      openNewAcc: openNewAcc,
      changeStatus: changeStatus,
    },
    actions: {
      setSearched: setSearched,
      setDetailP: setDetailP,
      setOpenNew: setOpenNew,
      setOpenNewAcc: setOpenNewAcc,
      setChangeStatus: setChangeStatus,
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
