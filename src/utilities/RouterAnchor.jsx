import React from 'react';
import { withRouter } from 'react-router-dom';

import Anchor from 'grommet/components/Anchor';

function RouterAnchor({ history, path, ...rest }) {
  return (<Anchor {...rest} onClick={() => history.push(path)} />);
}

RouterAnchor.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
  path: React.PropTypes.string.isRequired,
};

export default withRouter(RouterAnchor);
