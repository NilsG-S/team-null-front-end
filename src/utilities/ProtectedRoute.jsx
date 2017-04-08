import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ type, required, component, ...rest }) {
  const authorized = required[type];

  return (
    <Route
      {...rest}
      render={(props) => {
        let output = null;

        if (authorized) {
          output = React.createElement(component, props);
        } else {
          output = (<Redirect to='/auth' />);
        }

        return output;
      }}
    />
  );
}

ProtectedRoute.propTypes = {
  type: React.PropTypes.number.isRequired,
  required: React.PropTypes.shape({
    0: React.PropTypes.bool.isRequired,
    1: React.PropTypes.bool.isRequired,
    2: React.PropTypes.bool.isRequired,
    3: React.PropTypes.bool.isRequired,
    4: React.PropTypes.bool.isRequired,
  }).isRequired,
  component: React.PropTypes.element.isRequired,
};

function getType(user) {
  return user.type;
}

function mapStateToProps(state) {
  return {
    type: getType(state.user),
  };
}

export default connect(mapStateToProps)(ProtectedRoute);
