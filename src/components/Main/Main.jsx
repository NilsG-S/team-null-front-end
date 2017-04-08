import React from 'react';

import Box from 'grommet/components/Box';

import NavBarContainer from 'components/NavBar/NavBarContainer.jsx';
import requireAuth from '../RequireAuth.js';

class Main extends React.Component {
  render() {
    return (
      <Box>
        <NavBarContainer />
        {this.props.children}
      </Box>
    );
  }
}

const requiredTypes = {
  0: false,
  1: true,
  2: true,
  3: true,
  4: true,
};

export default requireAuth(Main, requiredTypes);
