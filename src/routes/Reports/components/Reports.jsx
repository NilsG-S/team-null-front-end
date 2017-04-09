import React from 'react';

import protectRoute from 'utilities/ProtectRoute.jsx';

class Reports extends React.Component {
  render() {
    return (
      <div>
        <h2>Reports</h2>
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
