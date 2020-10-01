import React from 'react';
import {
  Sidebar,
  Table,
  Container,
  SidebarProps,
  Button,
} from 'semantic-ui-react';
import { useAccContext } from '../contexts/AccContext';

const SearchPatients = ({ visible }: SidebarProps) => {
  const accCtx = useAccContext();
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
            <Table.Row>
              <Table.Cell>00001</Table.Cell>
              <Table.Cell>漢字　仮名（カンジ　カナ）</Table.Cell>
              <Table.Cell textAlign='center' style={{ padding: '0' }}>
                <Button
                  icon='desktop'
                  color='green'
                  label='カルテ'
                  style={{ fontSize: '10px' }}
                  onClick={() => accCtx.actions.setDetailP(true)}
                ></Button>
              </Table.Cell>
              <Table.Cell>2000/01/01(H.12)</Table.Cell>
              <Table.Cell>22際3カ月</Table.Cell>
              <Table.Cell>男</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    </Sidebar>
  );
};

export default SearchPatients;
