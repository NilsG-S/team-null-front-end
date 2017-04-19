import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from 'grommet/components/App';
import Box from 'grommet/components/Box';

import NavBarContainer from 'components/NavBar/NavBarContainer.jsx';
import healthApp from 'redux/reducers.js';
import authRoute from './routes/Auth';
import calendarRoute from './routes/Calendar';
import reportsRoute from './routes/Reports';
import Appointment from './routes/Appointment/components/Appointment.jsx';
import Record from './routes/Record/components/Record.jsx';

// store holds the redux store that allows app-wide state to be shared
const store = createStore(healthApp);

const AppConfig = () => (
  // Provider shares store with components joined by connect()
  <Provider store={store}>
    <HashRouter>
      <App
        centered={false}
        inline={false}
      >
        <Box full>
          <NavBarContainer />
          <Route exact path="/" render={() => (
            <Redirect to="/auth"/>
          )}/>
          {authRoute}
          {calendarRoute}
          {reportsRoute}
          <Route path='/appointment' component={Appointment} />
          <Route path='/record' component={Record} />
        </Box>
      </App>
    </HashRouter>
  </Provider>
);

export { store };
export default AppConfig;
