import React from 'react';

import App from 'grommet/components/App';
import Box from 'grommet/components/Box';

class AppView extends React.Component {
  render() {
    return (
      <App
        centered={false}
        inline={false}>
        <Box full={true}>
          {this.props.children}
        </Box>
      </App>
    );
  }
}

export default AppView;
