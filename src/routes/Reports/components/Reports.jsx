import React from 'react';

import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';

import protectRoute from 'utilities/ProtectRoute.jsx';
import DailyReports from './DailyReports.jsx';
import MonthlyReports from './MonthlyReports.jsx';

class Reports extends React.Component {
  render() {
    return (
      <div>
        <h2>Reports</h2>
        <Tabs>
          <Tab title='Daily'>
            <DailyReports />
          </Tab>
          <Tab title='Monthly'>
            <MonthlyReports />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const required = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: true,
};

export default protectRoute(Reports, required);
