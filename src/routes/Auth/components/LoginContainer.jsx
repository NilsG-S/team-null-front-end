import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import * as server from 'server';
import logger from 'logger/logger.js';
import Login from './Login.jsx';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logErr: '',
      waiting: false,
    };

    /*
      Only functions that are being passed out of this scope, as in the case
      of passing props to children, need to be bound. This ensures that they
      can still access the scope of this component even though they are
      being called from another component.
    */
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(id, password) {
    this.setState({
      waiting: true,
      logErr: '',
    });

    server.signIn(id, password)
      .then(() => {
        logger.info('User was logged in');
        this.props.router.push('/main');
      })
      .catch((e) => {
        logger.error(e.message);
        this.setState({
          logErr: e.message,
          waiting: false,
        });
      });
  }

  render() {
    return (
      <Login
        handleLogin={this.handleLogin}
        logErr={this.state.logErr}
        waiting={this.state.waiting}
      />
    );
  }
}

LoginContainer.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(withRouter(LoginContainer));
