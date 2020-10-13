import request from 'graphql-request';
import React, { FC, useEffect, useState } from 'react';
import { Form, Grid, Sidebar } from 'semantic-ui-react';
import { server_url } from '../api/Settings';
import AcceptanceList from '../components/AcceptanceList';
import PatientDetail from '../components/PatientDetail';
import RegistPatient from '../components/RegistPatient';
import SearchPatients from '../components/SearchPatients';
import Toolbar from '../components/Toolbar';
import { useAccContext } from '../contexts/AccContext';
import { GET_DEPARTMENT_GQ, GET_PHYSICIAN_GQ } from '../utils/graphql';

const dropdownOptions = [{ key: 'all', text: 'すべて', value: 'all' }];

const Acceptances: FC = () => {
  const accCtx = useAccContext();
  const [options1, setOptions1] = useState([
    { key: 'all', text: 'すべて', value: 'all' },
  ]);
  const [options2, setOptions2] = useState([
    {
      key: 'all',
      text: 'すべて',
      value: 'all',
      depart1_code: '',
      depart1_name: '',
      depart2_code: '',
      depart2_name: '',
    },
  ]);

  const allDepartment = () => {
    request(server_url, GET_DEPARTMENT_GQ([]))
      .then((data) => {
        const departData = data.getDepartment;
        const departList = departData.map((dd: any) => {
          return { key: dd.code, text: dd.name, value: dd.code };
        });
        accCtx.actions.setAllDepartData(departList);
        setOptions1(options1.concat(departList));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const allPhysician = () => {
    request(server_url, GET_PHYSICIAN_GQ([]))
      .then((data) => {
        const physData = data.getPhysician;
        const physList = physData.map((dd: any) => {
          return {
            key: dd.code,
            text: dd.name,
            value: dd.code,
            depart1_code: dd.depart1.code,
            depart1_name: dd.depart1.name,
            depart2_code: dd.depart2 !== null ? dd.depart2.code : '',
            depart2_name: dd.depart2 !== null ? dd.depart2.name : '',
          };
        });
        accCtx.actions.setAllPhysData(physList);
        setOptions2(options2.concat(physList));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    allDepartment();
    allPhysician();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Sidebar.Pushable>
        <PatientDetail visible={accCtx.state.detailP} />
        <Sidebar.Pusher>
          <Grid padded style={{ backgroundColor: '#ECEFF1' }}>
            <Grid.Row style={{}}>
              <Grid.Column style={{ padding: '0', backgroundColor: '#ECEFF1' }}>
                <Toolbar />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{}}>
              <Grid.Column style={{ padding: '0', backgroundColor: '#ECEFF1' }}>
                <Sidebar.Pushable>
                  <SearchPatients visible={accCtx.state.searched} />
                  <Sidebar.Pusher>
                    <Grid>
                      <Grid.Row
                        style={{ height: '60px', backgroundColor: '#ECEFF1' }}
                      >
                        <Grid.Column
                          style={{
                            height: '40px',
                            backgroundColor: '#ECEFF1',
                          }}
                        >
                          <Form style={{ paddingLeft: '10px' }}>
                            <Form.Group inline>
                              <Form.Dropdown
                                label='診療科：'
                                options={options1}
                                defaultValue={'all'}
                                selection
                                style={{ backgroundColor: '#ECEFF1' }}
                              />
                              <Form.Dropdown
                                label='診療種別：'
                                options={dropdownOptions}
                                defaultValue={'all'}
                                selection
                                style={{ backgroundColor: '#ECEFF1' }}
                              />
                              <Form.Dropdown
                                label='担当医師：'
                                options={options2}
                                defaultValue={'all'}
                                selection
                                style={{
                                  backgroundColor: '#ECEFF1',
                                  width: 160,
                                }}
                              />
                            </Form.Group>
                          </Form>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row style={{ padding: '0' }}>
                        <Grid.Column
                          style={{
                            backgroundColor: '#ECEFF1',
                            minHeight: '83vh',
                          }}
                          // style={{
                          //   backgroundColor: 'red',
                          //   minHeight: '80vh',
                          //   padding: '0',
                          // }}
                        >
                          <AcceptanceList />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Sidebar.Pusher>
                </Sidebar.Pushable>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      <RegistPatient
        onClose={() => accCtx.actions.setOpenNew(false)}
        onOpen={() => accCtx.actions.setOpenNew(true)}
        open={accCtx.state.openNew}
      />
    </div>
  );
};

export default Acceptances;
