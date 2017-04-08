import React from 'react';

import Box from 'grommet/components/Box';

import NavBarContainer from 'components/NavBar/NavBarContainer.jsx';
import protectRoute from 'utilities/ProtectRoute.jsx';

class Calendar extends React.Component {
  render() {
    return (
      <Box>
        <NavBarContainer />
        <h2>Calendar</h2>
      </Box>
    );
  }
}

const required = {
  0: false,
  1: true,
  2: true,
  3: true,
  4: false,
};

export default protectRoute(Calendar, required);
