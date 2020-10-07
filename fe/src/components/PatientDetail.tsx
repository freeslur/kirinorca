import request from 'graphql-request';
import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonProps,
  Segment,
  Sidebar,
  SidebarProps,
} from 'semantic-ui-react';
import { server_url } from '../api/Settings';
import { useAccContext } from '../contexts/AccContext';
import { PATIENT_DETAIL_GQ } from '../utils/graphql';
import RegistAcceptance from './RegistAcceptance';

const PatientDetail = ({ visible }: SidebarProps) => {
  const [detailData, setDetailData] = useState<any>({});
  const accCtx = useAccContext();

  const getPatiDetail = (patiId: string) => {
    request(server_url, PATIENT_DETAIL_GQ(patiId))
      .then((data: any) => {
        console.log(data);
        setDetailData(JSON.parse(data.patiDetail.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(accCtx.state.patiDetailId);
    if (accCtx.state.patiDetailId !== '') {
      getPatiDetail(accCtx.state.patiDetailId);
    } else {
      setDetailData({});
    }
  }, [accCtx.state.patiDetailId]);

  return (
    <Sidebar
      as={Segment}
      animation='overlay'
      direction='right'
      visible={visible}
      width='very wide'
    >
      <Button
        color='green'
        onClick={(e: React.MouseEvent, d: ButtonProps) => {
          accCtx.actions.setOpenNewAcc(true);
        }}
      >
        受付する
      </Button>
      <Button color='green' disabled>
        会計処理
      </Button>
      <Button color='green' onClick={() => accCtx.actions.setDetailP(false)}>
        閉じる
      </Button>
      <Segment>{'患者情報:' + detailData.Patient_ID + '患者情報:'}</Segment>
      {console.log(typeof detailData)}
      <Segment>{detailData.Patient_ID}</Segment>
      <RegistAcceptance
        onClose={() => accCtx.actions.setOpenNewAcc(false)}
        onOpen={() => accCtx.actions.setOpenNewAcc(true)}
        open={accCtx.state.openNewAcc}
      />
    </Sidebar>
  );
};

export default PatientDetail;
