import React from 'react';

import Box from 'grommet/components/Box';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';

import LoginContainer from './components/LoginContainer.jsx';
import RegisterContainer from './components/RegisterContainer.jsx';

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
    return (
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
          <Tab title='Register'>
            <RegisterContainer />
          </Tab>
        </Tabs>
      </Box>
    );
  }
}

export default Auth;
