import React from 'react';
import { Route } from 'react-router-dom';

import Auth from './components/Auth.jsx';

const authRoute = (
  <Route exact path='/auth' component={Auth} />
);

export default authRoute;
