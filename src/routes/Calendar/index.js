import React from 'react';
import { Route } from 'react-router-dom';

import Calendar from './components/Calendar.jsx';

const calendarRoute = (
  <Route exact path='/calendar' component={Calendar} />
);

export default calendarRoute;
