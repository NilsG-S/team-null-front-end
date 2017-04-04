import React from 'react';
import { Route } from 'react-router';

import Auth from './components/Auth.jsx';

const authRoute = (
  <Route path='/auth' component={Auth} />
);

export default authRoute;
