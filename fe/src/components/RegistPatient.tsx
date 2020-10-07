import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonProps,
  Form,
  Grid,
  Modal,
  ModalProps,
  Table,
} from 'semantic-ui-react';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ja from 'date-fns/locale/ja';
import { useAccContext } from '../contexts/AccContext';
import { server_url } from '../api/Settings';
import { NEW_PATIENT_GQ } from '../utils/graphql';
import request from 'graphql-request';
import { date_to_string } from '../utils/utils';
registerLocale('ja', ja);

const RegistPatient = ({ onClose, onOpen, open }: ModalProps) => {
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());
  const accCtx = useAccContext();

  const getNewbieData = (startDate: string, endDate: string) => {
    request(server_url, NEW_PATIENT_GQ(startDate, endDate))
      .then((data: any) => {
        accCtx.actions.setNewbieData(data['newPatiList']);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (accCtx.state.openNew) {
      getNewbieData(date_to_string(startDate), date_to_string(endDate));
    } else {
      accCtx.actions.setNewbieData([]);
    }
  }, [accCtx.state.openNew]);

  const handleSearch = () => {
    getNewbieData(date_to_string(startDate), date_to_string(endDate));
  };

  const handleRegist = () => {
    alert('登録完了');
  };

  const handleRegAndAcc = () => {
    alert('受付完了');
  };

  const handleRegAndReserv = () => {
    alert('予約完了');
  };

  return (
    <Modal size='fullscreen' onClose={onClose} onOpen={onOpen} open={open}>
      <Modal.Header>患者登録リスト</Modal.Header>
      <Modal.Content>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Group>
                  <DatePicker
                    locale='ja'
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat='yyyy-MM-dd'
                    placeholderText='Click'
                    customInput={
                      <Form.Input
                        icon='calendar outline'
                        style={{ color: 'green' }}
                      />
                    }
                  />
                  <div> ～ </div>
                  <DatePicker
                    locale='ja'
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat='yyyy-MM-dd'
                    placeholderText='Click'
                    customInput={
                      <Form.Input
                        icon='calendar outline'
                        style={{ color: 'green' }}
                      />
                    }
                  />
                  <Form.Button color='green' onClick={handleSearch}>
                    検索する
                  </Form.Button>
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>診察券番号</Table.HeaderCell>
                    <Table.HeaderCell>漢字氏名</Table.HeaderCell>
                    <Table.HeaderCell>カナ氏名</Table.HeaderCell>
                    <Table.HeaderCell>生年月日</Table.HeaderCell>
                    <Table.HeaderCell>性別</Table.HeaderCell>
                    <Table.HeaderCell>登録日付</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {accCtx.state.newbieData.map((data: any) => {
                    console.log(data);
                    return (
                      <Table.Row key={data.patiId}>
                        <Table.Cell>{data.patiId}</Table.Cell>
                        <Table.Cell>{data.sei + '　' + data.mei}</Table.Cell>
                        <Table.Cell>
                          {data.seiKana + '　' + data.meiKana}
                        </Table.Cell>
                        <Table.Cell>{data.birth}</Table.Cell>
                        <Table.Cell>
                          {data.sex !== '1' ? '男' : '女'}
                        </Table.Cell>
                        <Table.Cell>{data.regDate}</Table.Cell>
                        <Table.Cell>
                          <Button
                            icon='pencil'
                            content='登録'
                            color='green'
                            style={{ margin: '0 10px' }}
                            onClick={handleRegist}
                          ></Button>
                          <Button
                            icon='desktop'
                            content='受付'
                            color='blue'
                            label={{
                              as: 'a',
                              icon: 'pencil',
                              color: 'green',
                              pointing: 'right',
                              content: '登録',
                            }}
                            labelPosition='left'
                            style={{ margin: '0 10px' }}
                            onClick={handleRegAndAcc}
                          ></Button>
                          <Button
                            icon='calendar outline'
                            content='予約'
                            color='blue'
                            label={{
                              as: 'a',
                              icon: 'pencil',
                              color: 'green',
                              pointing: 'right',
                              content: '登録',
                            }}
                            labelPosition='left'
                            style={{ margin: '0 10px' }}
                            onClick={handleRegAndReserv}
                          ></Button>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={(e: React.MouseEvent, data: ButtonProps) =>
            accCtx.actions.setOpenNew(false)
          }
        >
          閉じる
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default RegistPatient;
