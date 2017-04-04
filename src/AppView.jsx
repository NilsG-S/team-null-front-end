import React from 'react';

import App from 'grommet/components/App';
import Box from 'grommet/components/Box';

function AppView(props) {
  return (
    <App
      centered={false}
      inline={false}
    >
      <Box full>
        {props.children}
      </Box>
    </App>
  );
}

AppView.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default AppView;
