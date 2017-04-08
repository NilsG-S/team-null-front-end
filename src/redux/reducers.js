import { UserActionTypes, employee } from './actions.js';

function user(state = employee, action) {
  switch (action.type) {
    case UserActionTypes.UPDATE:
      return action.user;
    case UserActionTypes.LOGOUT:
      return employee;
    default:
      return state;
  }
}

function healthApp(state = {}, action) {
  return {
    user: user(state.user, action),
  };
}

export default healthApp;
