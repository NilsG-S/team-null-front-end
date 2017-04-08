import { connect } from 'react-redux';
import { withRouter } from 'react-router';

function requireAuth(WrappedComponent, requiredTypes) {
  class AuthWrapper extends WrappedComponent {
    componentWillMount() {
      const authorized = requiredTypes[this.props.user.type]

      if (authorized !== true) {
        this.props.router.push('/');
      }
    }

    render() {
      return super.render();
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
