import request from 'graphql-request';
import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionTitleProps,
  Button,
  Container,
  Dropdown,
  Icon,
  Label,
  Table,
} from 'semantic-ui-react';
import { server_url } from '../api/Settings';
import { PLACE_OPTIONS } from '../api/var';
import { useAccContext } from '../contexts/AccContext';
import { ALL_ACCEPTANCES_GQ } from '../utils/graphql';
import { convert_jp_date } from '../utils/utils';

const AcceptanceList = () => {
  const [activeIndex, setActiveIndex] = useState<string | number | undefined>(
    0
  );
  const accCtx = useAccContext();

  const allAccData = () => {
    request(server_url, ALL_ACCEPTANCES_GQ)
      .then((data: any) => {
        const accData = data.acceptances;
        accCtx.actions.setAllAccData(accData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    allAccData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleActiveIndex = (
    e: React.MouseEvent,
    titleProps: AccordionTitleProps
  ) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <Container style={{ height: '100vh' }} fluid>
      <Accordion styled fluid>
        <Accordion.Title
          index={0}
          active
          onClick={handleActiveIndex}
          style={{
            backgroundColor: '#499937',
            color: 'white',
          }}
        >
          <Icon name='dropdown' />
          外来受付リスト　○人
        </Accordion.Title>
        <Accordion.Content active style={{ padding: '0' }}>
          <Table celled fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={1}>受付No</Table.HeaderCell>
                <Table.HeaderCell width={1}>受付内容</Table.HeaderCell>
                <Table.HeaderCell width={1}>受付時間</Table.HeaderCell>
                <Table.HeaderCell width={1}>状態</Table.HeaderCell>
                <Table.HeaderCell width={2}>名前</Table.HeaderCell>
                <Table.HeaderCell width={1}></Table.HeaderCell>
                <Table.HeaderCell width={2}>診察券番号</Table.HeaderCell>
                <Table.HeaderCell width={1}>担当医師</Table.HeaderCell>
                <Table.HeaderCell width={1}>患者位置</Table.HeaderCell>
                <Table.HeaderCell width={5}>受付コメント</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {console.log(accCtx.state.allAccData)}
              {accCtx.state.allAccData.map((data: any) => {
                if (data.status === '診療待ち') {
                  return (
                    <Table.Row key={data.accId}>
                      <Table.Cell>{data.accId}</Table.Cell>
                      <Table.Cell textAlign='center'>
                        {data.departName}
                        <br />
                        {data.mediContents}
                      </Table.Cell>
                      <Table.Cell>{data.time}</Table.Cell>
                      <Table.Cell textAlign='center' style={{ padding: '0' }}>
                        <Label style={{}}>{data.status}</Label>
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        {data.patiSeiKana + '　' + data.patiMeiKana}
                        <br />
                        {data.patiSei + '　' + data.patiMei}
                      </Table.Cell>
                      <Table.Cell textAlign='center' style={{ padding: '0' }}>
                        <Button
                          icon='desktop'
                          color='green'
                          label='カルテ'
                          style={{ fontSize: '10px' }}
                          onClick={() => {
                            accCtx.actions.setPatiDetailId(data.patiId);
                            accCtx.actions.setDetailP(true);
                            accCtx.actions.setFromAccList(true);
                            accCtx.actions.setAccoutData(data);
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        {data.patiId}
                        <br />
                        {convert_jp_date(data.patiBirth) + '　' + data.patiSex}
                      </Table.Cell>
                      <Table.Cell>{data.physicName}</Table.Cell>
                      <Table.Cell textAlign='center' style={{ padding: '0' }}>
                        <Dropdown
                          defaultValue='待合室'
                          direction='right'
                          options={PLACE_OPTIONS}
                        />
                      </Table.Cell>
                      <Table.Cell>{data.memo}</Table.Cell>
                    </Table.Row>
                  );
                }
                return null;
              })}
            </Table.Body>
          </Table>
        </Accordion.Content>
        <Accordion.Title
          index={1}
          active
          onClick={handleActiveIndex}
          style={{
            backgroundColor: '#499937',
            color: 'white',
          }}
        >
          <Icon name='dropdown' />
          会計待ちリスト　○人
        </Accordion.Title>
        <Accordion.Content active style={{ padding: '0' }}>
          <Table celled fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={1}>受付No</Table.HeaderCell>
                <Table.HeaderCell width={1}>受付内容</Table.HeaderCell>
                <Table.HeaderCell width={1}>受付時間</Table.HeaderCell>
                <Table.HeaderCell width={1}>状態</Table.HeaderCell>
                <Table.HeaderCell width={2}>名前</Table.HeaderCell>
                <Table.HeaderCell width={1}></Table.HeaderCell>
                <Table.HeaderCell width={2}>診察券番号</Table.HeaderCell>
                <Table.HeaderCell width={1}>担当医師</Table.HeaderCell>
                <Table.HeaderCell width={1}>患者位置</Table.HeaderCell>
                <Table.HeaderCell width={5}>受付コメント</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {accCtx.state.allAccData.map((data: any) => {
                if (data.status === '会計待ち') {
                  return (
                    <Table.Row key={data.accId}>
                      <Table.Cell>{data.accId}</Table.Cell>
                      <Table.Cell textAlign='center'>
                        {data.departName}
                        <br />
                        {data.mediContents}
                      </Table.Cell>
                      <Table.Cell>{data.time}</Table.Cell>
                      <Table.Cell textAlign='center' style={{ padding: '0' }}>
                        <Label style={{}}>{data.status}</Label>
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        {data.patiSeiKana + '　' + data.patiMeiKana}
                        <br />
                        {data.patiSei + '　' + data.patiMei}
                      </Table.Cell>
                      <Table.Cell textAlign='center' style={{ padding: '0' }}>
                        <Button
                          icon='desktop'
                          color='green'
                          label='カルテ'
                          style={{ fontSize: '10px' }}
                          onClick={() => {
                            accCtx.actions.setPatiDetailId(data.patiId);
                            accCtx.actions.setDetailP(true);
                            accCtx.actions.setFromAccList(true);
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        {data.patiId}
                        <br />
                        {convert_jp_date(data.patiBirth) + '　' + data.patiSex}
                      </Table.Cell>
                      <Table.Cell>{data.physicName}</Table.Cell>
                      <Table.Cell textAlign='center' style={{ padding: '0' }}>
                        <Dropdown
                          defaultValue='待合室'
                          direction='right'
                          options={PLACE_OPTIONS}
                        />
                      </Table.Cell>
                      <Table.Cell>{data.memo}</Table.Cell>
                    </Table.Row>
                  );
                }
                return null;
              })}
            </Table.Body>
          </Table>
        </Accordion.Content>
        <Accordion.Title
          index={2}
          active
          onClick={handleActiveIndex}
          style={{
            backgroundColor: '#499937',
            color: 'white',
          }}
        >
          <Icon name='dropdown' />
          会計済みリスト　○人
        </Accordion.Title>
        <Accordion.Content active style={{ padding: '0' }}>
          <Table celled fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={1}>受付No</Table.HeaderCell>
                <Table.HeaderCell width={1}>受付内容</Table.HeaderCell>
                <Table.HeaderCell width={1}>受付時間</Table.HeaderCell>
                <Table.HeaderCell width={1}>状態</Table.HeaderCell>
                <Table.HeaderCell width={2}>名前</Table.HeaderCell>
                <Table.HeaderCell width={1}></Table.HeaderCell>
                <Table.HeaderCell width={2}>診察券番号</Table.HeaderCell>
                <Table.HeaderCell width={1}>担当医師</Table.HeaderCell>
                <Table.HeaderCell width={1}>患者位置</Table.HeaderCell>
                <Table.HeaderCell width={5}>受付コメント</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {accCtx.state.allAccData.map((data: any) => {
                if (data.status === '会計済み') {
                  return (
                    <Table.Row key={data.accId}>
                      <Table.Cell>{data.accId}</Table.Cell>
                      <Table.Cell textAlign='center'>
                        {data.departName}
                        <br />
                        {data.mediContents}
                      </Table.Cell>
                      <Table.Cell>{data.time}</Table.Cell>
                      <Table.Cell textAlign='center' style={{ padding: '0' }}>
                        <Label style={{}}>{data.status}</Label>
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        {data.patiSeiKana + '　' + data.patiMeiKana}
                        <br />
                        {data.patiSei + '　' + data.patiMei}
                      </Table.Cell>
                      <Table.Cell textAlign='center' style={{ padding: '0' }}>
                        <Button
                          icon='desktop'
                          color='green'
                          label='カルテ'
                          style={{ fontSize: '10px' }}
                          onClick={() => {
                            accCtx.actions.setPatiDetailId(data.patiId);
                            accCtx.actions.setDetailP(true);
                            accCtx.actions.setFromAccList(true);
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        {data.patiId}
                        <br />
                        {convert_jp_date(data.patiBirth) + '　' + data.patiSex}
                      </Table.Cell>
                      <Table.Cell>{data.physicName}</Table.Cell>
                      <Table.Cell textAlign='center' style={{ padding: '0' }}>
                        <Dropdown
                          defaultValue='待合室'
                          direction='right'
                          options={PLACE_OPTIONS}
                        />
                      </Table.Cell>
                      <Table.Cell>{data.memo}</Table.Cell>
                    </Table.Row>
                  );
                }
                return null;
              })}
            </Table.Body>
          </Table>
        </Accordion.Content>
      </Accordion>
    </Container>
  );
};

export default AcceptanceList;
