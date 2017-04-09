import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as server from 'server';
import logger from 'logger/logger.js';
import NavBar from './NavBar.jsx';

class NavBarContainer extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    server.signOut().then(() => {
      logger.info('User was signed out');
      this.props.history.push('/');
    });
  }

  render() {
    return (
      <NavBar
        first_name={this.props.first_name}
        type={this.props.type}
        logout={this.logout}
      />
    );
  }
}

NavBarContainer.propTypes = {
  first_name: React.PropTypes.string.isRequired,
  type: React.PropTypes.number.isRequired,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

// Used by mapStateToProps to get user.first_name from the redux store
function getFirstName(user) {
  return user.first_name;
}

function getType(user) {
  return user.type;
}

// Used by connect to map user to this.props.user
function mapStateToProps(state) {
  return {
    first_name: getFirstName(state.user),
    type: getType(state.user),
  };
}

export default connect(mapStateToProps)(withRouter(NavBarContainer));
