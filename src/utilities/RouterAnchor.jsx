import React from 'react';
import { withRouter } from 'react-router-dom';

import Anchor from 'grommet/components/Anchor';

function RouterAnchor({ path, ...rest }) {
  class AnchorWrapper extends React.Component {
    render() {
      return (
        <Anchor {...rest} onClick={() => this.props.history.push(path)}/>
      );
    }
  }

  return withRouter(AnchorWrapper);
}

// function RouterAnchor({ history, path, ...rest }) {
//   return (<Anchor {...rest} onClick={() => history.push(path)}/>);
// }
//
// export default withRouter(RouterAnchor);

export default RouterAnchor;
