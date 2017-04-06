import { updateUser, logoutUser, AuthStates } from 'redux/actions.js';
import { store } from 'AppConfig.jsx';

const employees = {
  1: {
    employee_id: 1,
    first_name: 'Doctor',
    last_name: 'Test',
    type: AuthStates.DOCTOR,
    associated_id: 2,
  },
  2: {
    employee_id: 2,
    first_name: 'Nurse',
    last_name: 'Test',
    type: AuthStates.NURSE,
    associated_id: 1,
  },
  3: {
    employee_id: 3,
    first_name: 'Staff',
    last_name: 'Test',
    type: AuthStates.STAFF,
    associated_id: null,
  },
  4: {
    employee_id: 4,
    first_name: 'CEO',
    last_name: 'Test',
    type: AuthStates.CEO,
    associated_id: null,
  },
};

export function signIn(id, password) {
  return new Promise((resolve, reject) => {
    if (id in employees) {
      const user = employees[id];
      store.dispatch(updateUser(user));
      resolve(user);
    } else {
      reject(Error('No such employee'));
    }
  });
}

export function register(user, password) {
  return new Promise((resolve, reject) => {
    if (!(user.employee_id in employees)) {
      store.dispatch(updateUser(user));
      resolve(user);
    } else {
      reject(Error('Cannot create employee'));
    }
  });
}

export function signOut() {
  return new Promise((resolve, reject) => {
    store.dispatch(logoutUser());
    resolve(undefined);
  });
}
