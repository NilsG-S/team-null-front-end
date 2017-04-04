import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import AppView from './AppView.jsx';
import Main from './components/Main/Main.jsx';
import authRoute from './routes/Auth';

const appRoute = (
  // Sets the path and primary component for this route
  <Route path='/' component={AppView}>
    {/* Load the login page by default */}
    <IndexRedirect to='auth' />

    {/* Set the children of the primary component */}
    {authRoute}
    <Route path='main' component={Main}>
      {/* All other routes go here */}
    </Route>
  </Route>
);

export default appRoute;
