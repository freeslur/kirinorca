import React, { useState } from 'react';
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
import { useAccContext } from '../contexts/AccContext';

const statusOption = [{ key: '1', text: '待合室', value: '待合室' }];

const AcceptanceList = () => {
  const [activeIndex, setActiveIndex] = useState<string | number | undefined>(
    0
  );
  const accCtx = useAccContext();

  const handleActiveIndex = (
    e: React.MouseEvent,
    titleProps: AccordionTitleProps
  ) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const handleShowDetail = (pati_id: string) => {
    accCtx.actions.setDetailP(true);
  };
  return (
    <Container fluid>
      <Accordion styled fluid>
        <Accordion.Title
          index={0}
          active={activeIndex === 0}
          onClick={handleActiveIndex}
          style={{
            backgroundColor: activeIndex === 0 ? '#499937' : 'gray',
            color: 'white',
          }}
        >
          <Icon name='dropdown' />
          外来受付リスト　○人
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0} style={{ padding: '0' }}>
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
              <Table.Row>
                <Table.Cell>0001</Table.Cell>
                <Table.Cell textAlign='center'>
                  内科
                  <br />
                  一般診療
                </Table.Cell>
                <Table.Cell>8:56</Table.Cell>
                <Table.Cell textAlign='center' style={{ padding: '0' }}>
                  <Label style={{}}>受付済み</Label>
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  キム　キム
                  <br />
                  金　金
                </Table.Cell>
                <Table.Cell textAlign='center' style={{ padding: '0' }}>
                  <Button
                    icon='desktop'
                    color='green'
                    label='カルテ'
                    style={{ fontSize: '10px' }}
                    onClick={() => handleShowDetail('')}
                  />
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  00001
                  <br />
                  49歳3ヶ月　女
                </Table.Cell>
                <Table.Cell>木村医師</Table.Cell>
                <Table.Cell textAlign='center' style={{ padding: '0' }}>
                  <Dropdown
                    defaultValue='待合室'
                    direction='right'
                    options={statusOption}
                  />
                </Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Accordion.Content>
        <Accordion.Title
          index={1}
          active={activeIndex === 1}
          onClick={handleActiveIndex}
          style={{
            backgroundColor: activeIndex === 1 ? '#499937' : 'gray',
            color: 'white',
          }}
        >
          <Icon name='dropdown' />
          会計待ちリスト　○人
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1} style={{ padding: '0' }}>
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
              <Table.Row>
                <Table.Cell>0001</Table.Cell>
                <Table.Cell textAlign='center'>
                  内科
                  <br />
                  一般診療
                </Table.Cell>
                <Table.Cell>8:56</Table.Cell>
                <Table.Cell textAlign='center' style={{ padding: '0' }}>
                  <Label style={{}}>受付済み</Label>
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  キム　キム
                  <br />
                  金　金
                </Table.Cell>
                <Table.Cell textAlign='center' style={{ padding: '0' }}>
                  <Button
                    icon='desktop'
                    color='green'
                    label='カルテ'
                    style={{ fontSize: '10px' }}
                  ></Button>
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  00001
                  <br />
                  49歳3ヶ月　女
                </Table.Cell>
                <Table.Cell>木村医師</Table.Cell>
                <Table.Cell textAlign='center' style={{ padding: '0' }}>
                  <Dropdown
                    defaultValue='待合室'
                    direction='right'
                    options={statusOption}
                  />
                </Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Accordion.Content>
        <Accordion.Title
          index={2}
          active={activeIndex === 2}
          onClick={handleActiveIndex}
          style={{
            backgroundColor: activeIndex === 2 ? '#499937' : 'gray',
            color: 'white',
          }}
        >
          <Icon name='dropdown' />
          会計済みリスト　○人
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2} style={{ padding: '0' }}>
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
              <Table.Row>
                <Table.Cell>0001</Table.Cell>
                <Table.Cell textAlign='center'>
                  内科
                  <br />
                  一般診療
                </Table.Cell>
                <Table.Cell>8:56</Table.Cell>
                <Table.Cell textAlign='center' style={{ padding: '0' }}>
                  <Label style={{}}>受付済み</Label>
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  キム　キム
                  <br />
                  金　金
                </Table.Cell>
                <Table.Cell textAlign='center' style={{ padding: '0' }}>
                  <Button
                    icon='desktop'
                    color='green'
                    label='カルテ'
                    style={{ fontSize: '10px' }}
                  ></Button>
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  00001
                  <br />
                  49歳3ヶ月　女
                </Table.Cell>
                <Table.Cell>木村医師</Table.Cell>
                <Table.Cell textAlign='center' style={{ padding: '0' }}>
                  <Dropdown
                    defaultValue='待合室'
                    direction='right'
                    options={statusOption}
                  />
                </Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Accordion.Content>
      </Accordion>
    </Container>
  );
};

export default AcceptanceList;
