import React from 'react';
import { Redirect } from 'react-router-dom';

import Box from 'grommet/components/Box';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';

import { AuthStates } from 'redux/actions.js';
import LoginContainer from './LoginContainer.jsx';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(newIndex) {
    this.setState({
      index: newIndex,
    });
  }

  render() {
    let output = null;
    switch (user.type) {
      case AuthStates.GUEST:
        output = (
          <Box
            flex
            align='center'
            justify='center'
          >
            <Tabs
              activeIndex={this.state.index}
              justify='center'
              responsive={false}
              onActive={this.handleTabChange}
            >
              <Tab title='Login'>
                <LoginContainer />
              </Tab>
            </Tabs>
          </Box>
        );
      default:
        output = (
          <Redirect to="/calendar" />
        );
    }

    return output;
  }
}

function getUser(user) {
  return user;
}

function mapStateToProps(state) {
  return {
    user: getUser(state.user),
  };
}

export default connect(mapStateToProps)(Auth);
