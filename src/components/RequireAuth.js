import { connect } from 'react-redux';
import { withRouter } from 'react-router';

function requireAuth(WrappedComponent, requiredTypes) {
  class AuthWrapper extends WrappedComponent {
    render() {
      const authorized = requiredTypes
        .find(type => this.props.user.type === type);

      // Depnding on whether the user has the required type
      let output = null;

      if (authorized === true) {
        // Render the component
        output = super.render();
      } else {
        this.props.router.push('/');
      }

      return output;
    }
  }

  function getUser(user) {
    return user;
  }

  function mapStateToProps(state) {
    return {
      user: getUser(state.user),
    };
  }

  return connect(mapStateToProps)(withRouter(AuthWrapper));
}

export default requireAuth;
