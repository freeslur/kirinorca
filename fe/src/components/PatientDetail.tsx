import request from 'graphql-request';
import React, { useEffect } from 'react';
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
import { calc_age, convert_sex } from '../utils/utils';
import RegistAcceptance from './RegistAcceptance';

const PatientDetail = ({ visible }: SidebarProps) => {
  const accCtx = useAccContext();

  const getPatiDetail = (patiId: string) => {
    request(server_url, PATIENT_DETAIL_GQ(patiId))
      .then((data: any) => {
        accCtx.actions.setDetailData(data.patiDetail.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (accCtx.state.patiDetailId !== '') {
      getPatiDetail(accCtx.state.patiDetailId);
    } else {
      accCtx.actions.setDetailData({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accCtx.state.patiDetailId]);

  useEffect(() => {
    if (!accCtx.state.detailP) {
      accCtx.actions.setDetailData({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accCtx.state.detailP]);

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
      <Segment>
        <h4>
          {'【' +
            accCtx.state.detailData.Patient_ID +
            '】' +
            accCtx.state.detailData.WholeName +
            '（' +
            accCtx.state.detailData.WholeName_inKana +
            '）'}
          <br />
          {accCtx.state.detailData.BirthDate +
            '（' +
            calc_age(accCtx.state.detailData.BirthDate) +
            '）' +
            convert_sex(accCtx.state.detailData.Sex)}
        </h4>
      </Segment>
      <Segment>
        {JSON.stringify(
          accCtx.state.detailData.HealthInsurance_Information,
          null,
          2
        )}
      </Segment>
      <RegistAcceptance
        onClose={() => accCtx.actions.setOpenNewAcc(false)}
        onOpen={() => accCtx.actions.setOpenNewAcc(true)}
        open={accCtx.state.openNewAcc}
      />
    </Sidebar>
  );
};

export default PatientDetail;
