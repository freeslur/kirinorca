import React, { FC } from 'react';
import { Form, Grid, Sidebar } from 'semantic-ui-react';
import AcceptanceList from '../components/AcceptanceList';
import PatientDetail from '../components/PatientDetail';
import RegistPatient from '../components/RegistPatient';
import SearchPatients from '../components/SearchPatients';
import Toolbar from '../components/Toolbar';
import { useAccContext } from '../contexts/AccContext';

const dropdownOptions = [{ key: 'all', text: 'すべて', value: 'all' }];

const Acceptances: FC = () => {
  const accCtx = useAccContext();

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
                                options={dropdownOptions}
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
                                options={dropdownOptions}
                                defaultValue={'all'}
                                selection
                                style={{ backgroundColor: '#ECEFF1' }}
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
