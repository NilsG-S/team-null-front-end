import React from 'react';
import { Router, hashHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import healthApp from 'redux/reducers.js';
import appRoute from './app-route.jsx';

// store holds the redux store that allows app-wide state to be shared
const store = createStore(healthApp);

const AppConfig = () => (
  // Provider shares store with components joined by connect()
  <Provider store={store}>
    <Router history={hashHistory} routes={appRoute} />
  </Provider>
);

export { store };
export default AppConfig;
