import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  Grid,
  Icon,
  Modal,
  ModalProps,
  Radio,
  TextArea,
} from 'semantic-ui-react';
import 'antd/dist/antd.css';
import { useAccContext } from '../contexts/AccContext';
import {
  convert_jp_date,
  convert_sex,
  date_to_string,
  time_to_string,
} from '../utils/utils';
import { ACC_MEDICALS, PLACE_OPTIONS, STATUS } from '../api/var';
import request from 'graphql-request';
import { server_url } from '../api/Settings';
import { PATIENT_DETAIL_GQ, REGIST_ACCEPTANCE_GQ } from '../utils/graphql';

type AccDataType = {
  date?: string;
  time?: string;
  pati_id: string;
  pati_sei?: string;
  pati_mei?: string;
  pati_sei_kana?: string;
  pati_mei_kana?: string;
  pati_birth?: string;
  pati_sex?: string;
  status?: string;
  depart_code?: string;
  depart_name?: string;
  physic_code: string;
  physic_name?: string;
  appoint_id?: string;
  appoint_time?: string;
  account_time?: string;
  medi_contents?: string;
  place?: string;
  memo?: string;
  insurance?: any;
};

const RegistAcceptance = ({ onClose, onOpen, open }: ModalProps) => {
  const [radioSelValue, setRadioSelValue] = useState('10001');
  // const [accData, setAccData] = useState<AccDataType>({});
  const accCtx = useAccContext();
  let accData: AccDataType = {
    pati_id: '',
    physic_code: '10001',
    place: '待合室',
  };

  const checkDepart = (physValue: string) => {
    const physData = accCtx.state.allPhysData.find((fd: any) => {
      return fd.key === physValue;
    });
    console.log(physData);
    if (physData !== undefined) {
      accData.physic_code = physData.key;
      accData.physic_name = physData.text;
      accData.depart_code = physData.depart1_code;
      accData.depart_name = physData.depart1_name;
      setRadioSelValue(physData.depart1_code);
    }
  };

  useEffect(() => {
    checkDepart(radioSelValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accCtx.state.allPhysData]);

  const handleRegist = () => {
    // regist action
    const name =
      accData.pati_sei !== undefined ? accData.pati_sei.split('　') : undefined;
    const name_kana =
      accData.pati_sei_kana !== undefined
        ? accData.pati_sei_kana.split('　')
        : undefined;
    if (name !== undefined) {
      accData.pati_sei = name[0];
      accData.pati_mei = name.length > 1 ? name[1] : '';
    }
    if (name_kana !== undefined) {
      accData.pati_sei_kana = name_kana[0];
      accData.pati_mei_kana = name_kana.length > 1 ? name_kana[1] : '';
    }
    accData.pati_sex = accData.pati_sex === '1' ? '男' : '女';
    const date = new Date();
    accData.date = date_to_string(date);
    accData.time = time_to_string(date);
    accData.status = STATUS[0]['text'];
    checkDepart(accData.physic_code);
    request(server_url, PATIENT_DETAIL_GQ(accData.pati_id))
      .then((data: any) => {
        accData.insurance = data.patiDetail.data.HealthInsurance_Information[0];
        request(server_url, REGIST_ACCEPTANCE_GQ(accData))
          .then((data: any) => {
            console.log(data);
            // const patiData = data.allPatients.edges;
            // accCtx.actions.setAllPatiData(patiData);
            // accCtx.actions.setOpenNewAcc(false);
            // accCtx.actions.setDetailData({});
            // accCtx.actions.setDetailP(false);
            // accCtx.actions.setSearched(false);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDropdownChange = (event: any, data: any) => {
    const physValue = data.value;
    checkDepart(physValue);
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
            {'診察券番号: ' +
              (accData.pati_id = accCtx.state.detailData.Patient_ID)}
          </Card.Header>
          <Card.Content>
            <Grid>
              <Grid.Row style={{ height: 30 }}>
                <Grid.Column width={3}>氏名</Grid.Column>
                <Grid.Column width={13}>
                  {(accData.pati_sei = accCtx.state.detailData.WholeName)}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ height: 30 }}>
                <Grid.Column width={3}></Grid.Column>
                <Grid.Column width={13}>
                  {
                    (accData.pati_sei_kana =
                      accCtx.state.detailData.WholeName_inKana)
                  }
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ height: 30 }}>
                <Grid.Column width={3}>生年月日</Grid.Column>
                <Grid.Column width={13}>
                  {convert_jp_date(
                    (accData.pati_birth = accCtx.state.detailData.BirthDate),
                    true,
                    true
                  )}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ height: 30 }}>
                <Grid.Column width={3}>性別</Grid.Column>
                <Grid.Column width={13}>
                  {convert_sex(
                    (accData.pati_sex = accCtx.state.detailData.Sex)
                  )}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ height: 40 }}>
                <Grid.Column width={3}>診療種別</Grid.Column>
                <Grid.Column width={13}>
                  <Dropdown
                    placeholder='一般診療、予防接種、健診・検診'
                    multiple
                    options={ACC_MEDICALS}
                    onChange={(event, data) => {
                      if (
                        data.value !== null &&
                        typeof data.value === 'object'
                      ) {
                        const dd = data.value;
                        accData.medi_contents = dd.join();
                      }
                    }}
                  ></Dropdown>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ height: 30 }}>
                <Grid.Column width={3}>患者位置</Grid.Column>
                <Grid.Column width={13}>
                  <Dropdown
                    defaultValue='待合室'
                    options={PLACE_OPTIONS}
                    onChange={(event, data) => {
                      accData.place = data.value?.toString();
                    }}
                  ></Dropdown>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ height: 30 }}>
                <Grid.Column width={3}>担当医師</Grid.Column>
                <Grid.Column width={13}>
                  <Dropdown
                    defaultValue={accData.physic_code}
                    options={accCtx.state.allPhysData}
                    onChange={handleDropdownChange}
                  ></Dropdown>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ height: 30 }}>
                <Grid.Column width={3}>診療科</Grid.Column>
                <Grid.Column width={13}>
                  {accCtx.state.allDepartData.map((dd: any) => {
                    return (
                      <Radio
                        key={dd.key}
                        label={dd.text}
                        style={{ marginRight: 10 }}
                        name='selectedDepartment'
                        checked={radioSelValue === dd.key}
                        onClick={() => {
                          accData.depart_code = dd.key;
                          accData.depart_name = dd.text;
                          setRadioSelValue(dd.key);
                        }}
                        // disabled={
                        //   !(
                        //     dd.code ===
                        //       (accCtx.state.allPhysData.data
                        //         ? accCtx.state.allPhysData.data.find(
                        //             (d: any) => {
                        //               return d.code === accData.physic_code;
                        //             }
                        //           ).departCode1
                        //         : null) ||
                        //     dd.code ===
                        //       (accCtx.state.allPhysData.data
                        //         ? accCtx.state.allPhysData.data.find(
                        //             (d: any) => {
                        //               return d.code === accData.physic_code;
                        //             }
                        //           ).departCode2
                        //         : null)
                        //   )
                        // }
                      ></Radio>
                    );
                  })}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ height: 120 }}>
                <Grid.Column width={3}>受付コメント</Grid.Column>
                <Grid.Column width={13}>
                  <TextArea
                    rows={5}
                    style={{ width: 450, resize: 'none' }}
                    onChange={(event, data) => {
                      accData.memo = data.value?.toString();
                    }}
                  ></TextArea>
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
