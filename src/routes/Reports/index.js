import React from 'react';
import { Route } from 'react-router-dom';

import Reports from './components/Reports.jsx';

const reportsRoute = (
  <Route exact path='/reports' component={Reports} />
);

export default reportsRoute;
