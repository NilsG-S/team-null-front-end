// action types

export const UserActionTypes = {
  UPDATE: 'UPDATE',
  LOGOUT: 'LOGOUT',
};

// Register.js uses AuthStates to set the database values for role.
export const AuthStates = {
  GUEST: 0,
  DOCTOR: 1,
  NURSE: 2,
  STAFF: 3,
  CEO: 4,
};

export const guest = {
  type: AuthStates.GUEST,
};

export const employee = {
  employee_id: 0,
  first_name: '',
  last_name: '',
  type: AuthStates.GUEST,
  associated_id: 0,
};

// action creators

export function updateUser(user) {
  return {
    type: UserActionTypes.UPDATE,
    user,
  };
}

export function logoutUser() {
  return {
    type: UserActionTypes.LOGOUT,
  };
}
