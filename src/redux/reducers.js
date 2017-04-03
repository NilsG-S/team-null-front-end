import { UserActionTypes, guest } from './actions.js';

function user(state = guest, action) {
  switch (action.type) {
    case UserActionTypes.UPDATE:
      return action.user;
    case UserActionTypes.LOGOUT:
      return guest;
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
