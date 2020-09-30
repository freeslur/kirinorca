import React from 'react';
import { AccContextProvider } from './contexts/AccContext';
import Acceptances from './pages/Acceptances';

const App = () => {
  return (
    <div className='App'>
      <AccContextProvider>
        <Acceptances />
      </AccContextProvider>
    </div>
  );
};

export default App;
