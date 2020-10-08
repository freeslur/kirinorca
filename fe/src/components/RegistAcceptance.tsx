import React from 'react';
import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  Grid,
  Icon,
  Modal,
  ModalProps,
} from 'semantic-ui-react';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import { useAccContext } from '../contexts/AccContext';
import { convert_jp_date, convert_sex } from '../utils/utils';
import request from 'graphql-request';
import { server_url } from '../api/Settings';
import { REGIST_ACCEPTANCE_GQ } from '../utils/graphql';

const RegistAcceptance = ({ onClose, onOpen, open }: ModalProps) => {
  const accCtx = useAccContext();
  const options = [
    { key: '1', text: '一般診療', value: '一般診療' },
    { key: '2', text: '予防接種', value: '予防接種' },
    { key: '3', text: '健診・検診', value: '健診・検診' },
  ];
  const options2 = [
    { key: '1', text: '待合室', value: '待合室' },
    { key: '2', text: '健診・検診', value: '健診・検診' },
  ];
  const options3 = [
    { key: '1', text: '木林医師１', value: '木林医師１' },
    { key: '2', text: '木林医師２', value: '木林医師２' },
    { key: '3', text: '木林医師３', value: '木林医師３' },
  ];

  const handleRegist = () => {
    // regist action
    request(server_url, REGIST_ACCEPTANCE_GQ(accCtx.state.detailData))
      .then((data: any) => {
        console.log(data);
        const patiData = data.allPatients.edges;
        accCtx.actions.setAllPatiData(patiData);
        accCtx.actions.setOpenNewAcc(false);
        accCtx.actions.setDetailData({});
        accCtx.actions.setDetailP(false);
        accCtx.actions.setSearched(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      size='small'
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      style={{ backgroundColor: '#ECEFF1' }}
    >
      <Modal.Header>外来受付登録</Modal.Header>
      <Modal.Content style={{ backgroundColor: '#ECEFF1' }}>
        <Card fluid style={{ backgroundColor: '#ECEFF1' }}>
          <Card.Header
            style={{ padding: '10px', color: 'green', fontWeight: 'bold' }}
          >
            {'診察券番号: ' + accCtx.state.detailData.Patient_ID}
          </Card.Header>
          <Card.Content>
            <Grid>
              <Grid.Row style={{ height: 30 }}>
                <Grid.Column width={3}>氏名</Grid.Column>
                <Grid.Column width={13}>
                  {accCtx.state.detailData.WholeName}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ height: 30 }}>
                <Grid.Column width={3}></Grid.Column>
                <Grid.Column width={13}>
                  {accCtx.state.detailData.WholeName_inKana}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ height: 30 }}>
                <Grid.Column width={3}>生年月日</Grid.Column>
                <Grid.Column width={13}>
                  {convert_jp_date(
                    accCtx.state.detailData.BirthDate,
                    true,
                    true
                  )}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ height: 30 }}>
                <Grid.Column width={3}>性別</Grid.Column>
                <Grid.Column width={13}>
                  {convert_sex(accCtx.state.detailData.Sex)}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ height: 40 }}>
                <Grid.Column width={3}>診療種別</Grid.Column>
                <Grid.Column
                  as={Dropdown}
                  width={13}
                  placeholder='一般診療、予防接種、健診・検診'
                  multiple
                  options={options}
                ></Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ height: 30 }}>
                <Grid.Column width={3}>患者位置</Grid.Column>
                <Grid.Column
                  as={Dropdown}
                  width={13}
                  defaultValue='待合室'
                  options={options2}
                ></Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ height: 30 }}>
                <Grid.Column width={3}>担当医師</Grid.Column>
                <Grid.Column
                  as={Dropdown}
                  width={13}
                  defaultValue='木林医師１'
                  options={options3}
                ></Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ height: 120 }}>
                <Grid.Column width={3}>受付コメント</Grid.Column>
                <Grid.Column width={13}>
                  <Input.TextArea
                    rows={4}
                    style={{ resize: 'none' }}
                  ></Input.TextArea>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ height: 40 }}>
                <Grid.Column width={3}></Grid.Column>
                <Grid.Column width={13}>
                  <Checkbox label='緊急優先フラグ' />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
      </Modal.Content>
      <Modal.Actions style={{ textAlign: 'center' }}>
        <Button onClick={() => accCtx.actions.setOpenNewAcc(false)}>
          キャンセル
        </Button>
        <Button color='green' onClick={handleRegist}>
          <Icon name='pencil' />
          受付する
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default RegistAcceptance;
