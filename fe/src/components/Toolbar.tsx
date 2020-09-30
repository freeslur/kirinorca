import React, { useState } from 'react';
import {
  Button,
  Form,
  Grid,
  Icon,
  Menu,
  MenuItemProps,
} from 'semantic-ui-react';
import { useAccContext } from '../contexts/AccContext';

const Toolbar = () => {
  const accCtx = useAccContext();
  const [activeItem, setActiveItem] = useState<string | undefined>('newpati');

  const handleItemClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    { name }: MenuItemProps
  ) => {
    setActiveItem(name);
    accCtx.actions.setOpenNew(true);
  };

  const handleSearched = (flag: boolean) => {
    accCtx.actions.setSearched(flag);
  };

  return (
    <Grid padded>
      <Grid.Row style={{ padding: '0' }}>
        <Grid.Column
          style={{
            padding: '0',
            height: '60px',
            backgroundColor: '#ECEFF1',
            width: '240px',
          }}
        >
          <Menu
            icon='labeled'
            style={{ width: '240px', height: '60px', padding: '0' }}
          >
            <Menu.Item
              name='newpati'
              active={activeItem === 'newpati'}
              onClick={handleItemClick}
              style={{
                width: '80px',
                fontSize: '12px',
                padding: '0 auto',
                backgroundColor: '#499937',
                color: 'white',
              }}
            >
              <Icon name='user plus' />
              新規患者
            </Menu.Item>
            <Menu.Item
              name='newacc'
              active={activeItem === 'newacc'}
              onClick={handleItemClick}
              style={{
                width: '80px',
                fontSize: '12px',
                padding: '0 auto',
                margin: '0',
                backgroundColor: '#499937',
                color: 'white',
              }}
            >
              <Icon name='flag' />
              当日受付
            </Menu.Item>
            <Menu.Item
              name='reserve'
              active={activeItem === 'reserve'}
              onClick={handleItemClick}
              style={{
                width: '80px',
                fontSize: '12px',
                padding: '0 auto',
                margin: '0',
                backgroundColor: '#DFDAE0',
                color: '#4DA038',
              }}
            >
              <Icon name='calendar alternate outline' />
            </Menu.Item>
          </Menu>
        </Grid.Column>
        <Grid.Column
          style={{
            padding: '10px',
            height: '60px',
            backgroundColor: '#ECEFF1',
            width: '880px',
          }}
        >
          <Form>
            <Form.Group style={{ padding: '0', margin: '0' }}>
              <Form.Input
                fluid
                placeholder='診察券番号'
                style={{ width: '100px' }}
              />
              <Form.Input
                fluid
                placeholder='生年月日'
                style={{ width: '100px' }}
              />
              <Form.Input fluid placeholder='姓' style={{ width: '100px' }} />
              <Form.Input fluid placeholder='名' style={{ width: '100px' }} />
              <Form.Input
                fluid
                placeholder='姓カナ'
                style={{ width: '100px' }}
              />
              <Form.Input
                fluid
                placeholder='名カナ'
                style={{ width: '100px' }}
              />
              <Form.Button
                icon='search'
                style={{
                  width: '50px',
                  height: '38px',
                  backgroundColor: '#499937',
                  color: 'white',
                }}
                onClick={(e) => {
                  handleSearched(true);
                }}
              />
              <Form.Button
                style={{ width: '100px', height: '38px', fontSize: '11px' }}
                onClick={(e) => {
                  handleSearched(false);
                }}
              >
                すべてクリア
              </Form.Button>
            </Form.Group>
          </Form>
        </Grid.Column>
        <Grid.Column
          width={4}
          textAlign='right'
          style={{
            padding: '10px',
            height: '60px',
            backgroundColor: '#ECEFF1',
          }}
        >
          <Button
            style={{
              backgroundColor: '#84211B',
              color: 'white',
              textSize: '12px',
            }}
          >
            未承認一覧
          </Button>
          <Button
            style={{
              backgroundColor: '#84211B',
              color: 'white',
              textSize: '12px',
            }}
          >
            カルテ確定
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Toolbar;
