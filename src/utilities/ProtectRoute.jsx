import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

function protectRoute(Component, required) {
  class ProtectedWrapper extends React.Component {
    render() {
      const authorized = required[this.props.type];
      let output = null;

      if (authorized) {
        output = (<Component />);
      } else {
        output = (<Redirect to='/auth' />);
      }

      return output;
    }
  }

  ProtectedWrapper.propTypes = {
    type: React.PropTypes.number.isRequired,
  };

  function getType(user) {
    return user.type;
  }

  function mapStateToProps(state) {
    return {
      type: getType(state.user),
    };
  }

  return connect(mapStateToProps)(ProtectedWrapper);
}

export default protectRoute;
