import React from 'react';
import { Route } from 'react-router-dom';

import Calendar from './components/Calendar.jsx';

const calendarRoute = (
  <Route path='/calendar' component={Calendar} />
);

export default calendarRoute;
