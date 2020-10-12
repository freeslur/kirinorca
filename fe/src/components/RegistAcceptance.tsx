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
import request from 'graphql-request';
import { server_url } from '../api/Settings';
import { GET_PHYSICIAN_GQ, GET_DEPARTMENT_GQ } from '../utils/graphql';

type AccDataType = {
  date?: string;
  time?: string;
  pati_id?: string;
  pati_sei?: string;
  pati_mei?: string;
  pati_sei_kana?: string;
  pati_mei_kana?: string;
  pati_birth?: string;
  pati_sex?: string;
  status?: string;
  depart_code?: string;
  depart_name?: string;
  physic_code?: string;
  physic_name?: string;
  appoint_id?: string;
  appoint_time?: string;
  account_time?: string;
  medi_contents?: any;
  place?: string;
  memo?: string;
  insurance?: any;
};

type physOptionsType = {
  key: string;
  text: string;
  value: string;
};

const RegistAcceptance = ({ onClose, onOpen, open }: ModalProps) => {
  const [radioSelValue, setRadioSelValue] = useState('10001');
  const [physOptions, setPhysOptions] = useState<physOptionsType[]>([]);
  // const [accData, setAccData] = useState<AccDataType>({});
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
  let accData: AccDataType = { physic_code: '10001', place: '待合室' };

  const allPhysician = () => {
    request(server_url, GET_PHYSICIAN_GQ([]))
      .then((data) => {
        const physData: any[] = data.getPhysician;
        accCtx.actions.setAllPhysData(physData);
        const physList = physData.map((dd) => {
          if (dd.code === accData.physic_code) {
            accData.depart_code = dd.depart1.code;
            accData.depart_name = dd.depart1.name;
            setRadioSelValue(dd.depart1.code);
          }
          return { key: dd.code, text: dd.name, value: dd.code };
        });
        setPhysOptions(physList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const allDepartment = () => {
    request(server_url, GET_DEPARTMENT_GQ([]))
      .then((data) => {
        accCtx.actions.setAllDepartData(data.getDepartment);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    allPhysician();
    allDepartment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    console.log(accData);
    // request(server_url, REGIST_ACCEPTANCE_GQ(accCtx.state.detailData))
    //   .then((data: any) => {
    //     console.log(data);
    //     const patiData = data.allPatients.edges;
    //     accCtx.actions.setAllPatiData(patiData);
    //     accCtx.actions.setOpenNewAcc(false);
    //     accCtx.actions.setDetailData({});
    //     accCtx.actions.setDetailP(false);
    //     accCtx.actions.setSearched(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handleDropdownChange = (event: any, data: any) => {
    const physValue = data.value;
    const physData = accCtx.state.allPhysData.find((fd: any) => {
      return fd.code === physValue;
    });
    accData.physic_code = physData.code;
    accData.physic_name = physData.name;
    accData.depart_code = physData.depart1.code;
    accData.depart_name = physData.depart1.name;
    setRadioSelValue(physData.depart1.code);
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
                    options={options}
                    onChange={(event, data) => {
                      accData.medi_contents = data.value;
                    }}
                  ></Dropdown>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ height: 30 }}>
                <Grid.Column width={3}>患者位置</Grid.Column>
                <Grid.Column
                  width={13}
                  defaultValue='待合室'
                  options={options2}
                >
                  {' '}
                  <Dropdown
                    defaultValue='待合室'
                    options={options2}
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
                    options={physOptions}
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
                        key={dd.code}
                        label={dd.name}
                        style={{ marginRight: 10 }}
                        name='selectedDepartment'
                        checked={radioSelValue === dd.code}
                        onClick={() => {
                          accData.depart_code = dd.code;
                          accData.depart_name = dd.name;
                          setRadioSelValue(dd.code);
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
