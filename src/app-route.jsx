import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import Main from './components/Main/Main.jsx';
import authRoute from './routes/Auth';

const appRoute = (
  // Sets the path and primary component for this route
  <Route path='/'>
    {/* Load the login page by default */}
    <IndexRedirect to='login' />

    {/* Set the children of the primary component */}
    {authRoute}
    <Route path='main' component={Main}>
      {/* All other routes go here */}
    </Route>
  </Route>
);

export default appRoute;
