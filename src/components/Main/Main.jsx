import React from 'react';

import Box from 'grommet/components/Box';

import NavBarContainer from 'components/NavBar/NavBarContainer.jsx';

function Main(props) {
  return (
    <Box>
      <NavBarContainer />
      {props.children}
    </Box>
  );
}

Main.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default Main;
