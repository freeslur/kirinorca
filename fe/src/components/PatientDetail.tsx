import React from 'react';
import {
  Button,
  ButtonProps,
  Segment,
  Sidebar,
  SidebarProps,
} from 'semantic-ui-react';
import { useAccContext } from '../contexts/AccContext';
import RegistAcceptance from './RegistAcceptance';

const PatientDetail = ({ visible }: SidebarProps) => {
  const accCtx = useAccContext();

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
      <Segment>患者情報</Segment>
      <RegistAcceptance
        onClose={() => accCtx.actions.setOpenNewAcc(false)}
        onOpen={() => accCtx.actions.setOpenNewAcc(true)}
        open={accCtx.state.openNewAcc}
      />
    </Sidebar>
  );
};

export default PatientDetail;
