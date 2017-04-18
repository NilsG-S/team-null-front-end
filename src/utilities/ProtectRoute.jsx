import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

function protectRoute(Component, required) {
  class ProtectedWrapper extends React.Component {
    render() {
      const { dispatch, type, ...passThroughProps } = this.props;
      const authorized = required[type];
      let output = null;

      if (authorized) {
        output = (<Component {...passThroughProps} />);
      } else {
        output = (<Redirect to='/auth' />);
      }

      return output;
    }
  }

  ProtectedWrapper.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
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
