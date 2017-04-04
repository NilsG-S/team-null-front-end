import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { logoutUser } from 'redux/actions.js';
import logger from 'logger/logger.js';
import NavBar from './NavBar.jsx';

class NavBarContainer extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    logger.info('User was signed out');
    this.props.dispatch(logoutUser());
    this.props.router.push('/');
  }

  render() {
    return (
      <NavBar
        first_name={this.props.first_name}
        logout={this.logout}
      />
    );
  }
}

NavBarContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  first_name: React.PropTypes.string.isRequired,
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

// Used by mapStateToProps to get the current user from the redux store
function getFirstName(user) {
  return user.first_name;
}

// Used by connect to map user to this.props.user
function mapStateToProps(state) {
  return {
    first_name: getFirstName(state.user),
  };
}

export default connect(mapStateToProps)(withRouter(NavBarContainer));
