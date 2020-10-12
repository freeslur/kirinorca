import request from 'graphql-request';
import React, { useEffect } from 'react';
import {
  Sidebar,
  Table,
  Container,
  SidebarProps,
  Button,
} from 'semantic-ui-react';
import { server_url } from '../api/Settings';
import { useAccContext } from '../contexts/AccContext';
import { ALL_PATIENTS_GQ } from '../utils/graphql';
import { calc_age, convert_to_wareki } from '../utils/utils';

const SearchPatients = ({ visible }: SidebarProps) => {
  const accCtx = useAccContext();

  const allPatiData = () => {
    request(server_url, ALL_PATIENTS_GQ)
      .then((data: any) => {
        const patiData = data.patients;
        accCtx.actions.setAllPatiData(patiData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (accCtx.state.searched) {
      allPatiData();
    } else {
      accCtx.actions.setNewbieData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accCtx.state.searched]);

  return (
    <Sidebar
      as={Container}
      style={{
        padding: '0',
        margin: '0',
      }}
      animation='overlay'
      direction='top'
      visible={visible}
    >
      <Container
        style={{
          height: '86.5vh',
          backgroundColor: '#ECEFF1',
        }}
        fluid
      >
        <Container
          style={{
            height: 40,
            backgroundColor: 'green',
          }}
          fluid
        ></Container>
        <Table celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={3}>診察券番号</Table.HeaderCell>
              <Table.HeaderCell width={3}>漢字（カナ）</Table.HeaderCell>
              <Table.HeaderCell width={2}></Table.HeaderCell>
              <Table.HeaderCell width={3}>生年月日</Table.HeaderCell>
              <Table.HeaderCell width={3}>年齢</Table.HeaderCell>
              <Table.HeaderCell width={2}>性別</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {accCtx.state.allPatiData.map((patiData: any) => {
              return (
                <Table.Row key={patiData.patiId}>
                  <Table.Cell>{patiData.patiId}</Table.Cell>
                  <Table.Cell>
                    {patiData.sei +
                      '　' +
                      patiData.mei +
                      '（' +
                      patiData.seiKana +
                      '　' +
                      patiData.meiKana +
                      '）'}
                  </Table.Cell>
                  <Table.Cell textAlign='center' style={{ padding: '0' }}>
                    <Button
                      icon='desktop'
                      color='green'
                      label='カルテ'
                      style={{ fontSize: '10px' }}
                      onClick={() => {
                        accCtx.actions.setPatiDetailId(patiData.patiId);
                        accCtx.actions.setDetailP(true);
                      }}
                    ></Button>
                  </Table.Cell>
                  <Table.Cell>
                    {patiData.birth +
                      '（' +
                      convert_to_wareki(patiData.birth) +
                      '）'}
                  </Table.Cell>
                  <Table.Cell>{calc_age(patiData.birth)}</Table.Cell>
                  <Table.Cell>{patiData.sex === '1' ? '男' : '女'}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Container>
    </Sidebar>
  );
};

export default SearchPatients;
