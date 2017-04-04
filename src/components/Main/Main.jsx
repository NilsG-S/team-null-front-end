import React from 'react';

import App from 'grommet/components/App';
import Box from 'grommet/components/Box';

import NavBarContainer from 'components/NavBar/NavBarContainer.js';

class Main extends React.Component {
  render() {
    return (
      <Box>
        <NavBarContainer/>
        {this.props.children}
      </Box>
    );
  }
}

export default Main;
