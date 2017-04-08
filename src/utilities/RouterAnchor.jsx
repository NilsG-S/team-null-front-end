import React from 'react';
import { withRouter } from 'react-router-dom';

import Anchor from 'grommet/components/Anchor';

function RouterAnchor({ history, path, ...rest }) {
  const properties = rest;
  let clickFunction = null;

  if (path === rest.location.pathname) {
    clickFunction = () => {};
  } else {
    clickFunction = () => history.push(path);
  }

  delete properties.match;
  delete properties.location;
  delete properties.staticContext;

  return (<Anchor {...properties} onClick={clickFunction} />);
}

RouterAnchor.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
  path: React.PropTypes.string.isRequired,
};

export default withRouter(RouterAnchor);
