import React from 'react';

import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import MenuIcon from 'grommet/components/icons/base/Menu';
import UserIcon from 'grommet/components/icons/base/User';
import Anchor from 'grommet/components/Anchor';

import RouterAnchor from 'utilities/RouterAnchor.jsx';
import { AuthStates } from 'redux/actions.js';

function NavBar(props) {
  let nav;
  switch (props.type) {
    case AuthStates.CEO:
      nav = null;
      break;
    default:
      nav = (
        <Menu
          icon={<MenuIcon />}
          dropAlign={{ left: 'left', top: 'top' }}
        >
          <RouterAnchor path='/calendar'>
            Calendar
          </RouterAnchor>
        </Menu>
      );
  }

  let bar = (
    <Header
      fixed
      size='medium'
      flex
      direction='row'
      responsive={false}
      pad={{ horizontal: 'small' }}
    >
      {nav}
      <Title>
        HealthCare System
      </Title>
      <Box
        flex
        justify='end'
        direction='row'
        responsive={false}
      >
        <Menu
          dropAlign={{ right: 'right', top: 'top' }}
          icon={
            <Box
              flex
              direction='row'
              responsive={false}
            >
              <Box pad={{ horizontal: 'small' }}>
                {props.first_name}
              </Box>
              <UserIcon />
            </Box>
          }
        >
          <Anchor onClick={props.logout}>
            Logout
          </Anchor>
        </Menu>
      </Box>
    </Header>
  );

  if (props.type === AuthStates.GUEST) {
    bar = null;
  }

  return bar;
}


NavBar.propTypes = {
  first_name: React.PropTypes.string.isRequired,
  type: React.PropTypes.number.isRequired,
  logout: React.PropTypes.func.isRequired,
};

export default NavBar;
