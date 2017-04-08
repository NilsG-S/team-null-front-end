import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from 'grommet/components/App';
import Box from 'grommet/components/Box';

import healthApp from 'redux/reducers.js';
import authRoute from './routes/Auth';
import calendarRoute from './routes/Calendar';

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
          <Route exact path="/" render={() => (
            <Redirect to="/auth"/>
          )}/>
          {authRoute}
          {calendarRoute}
        </Box>
      </App>
    </HashRouter>
  </Provider>
);

export { store };
export default AppConfig;
