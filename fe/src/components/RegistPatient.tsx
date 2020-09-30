import React, { useState } from 'react';
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
registerLocale('ja', ja);

const RegistPatient = ({ onClose, onOpen, open }: ModalProps) => {
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());
  const accCtx = useAccContext();

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
                  <Form.Button color='green'>検索する</Form.Button>
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
                  <Table.Row>
                    <Table.Cell>00023</Table.Cell>
                    <Table.Cell>金　帰無</Table.Cell>
                    <Table.Cell>キム　キム</Table.Cell>
                    <Table.Cell>1983-08-08</Table.Cell>
                    <Table.Cell>男</Table.Cell>
                    <Table.Cell>2019-11-20</Table.Cell>
                    <Table.Cell>
                      <Button
                        icon='pencil'
                        content='登録'
                        color='green'
                        style={{ margin: '0 10px' }}
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
                      ></Button>
                    </Table.Cell>
                  </Table.Row>
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
