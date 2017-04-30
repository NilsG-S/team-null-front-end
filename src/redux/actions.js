// action types

export const UserActionTypes = {
  UPDATE: 'UPDATE',
  LOGOUT: 'LOGOUT',
};

export const AppointmentActionTypes = {
  EDIT: 'EDIT',
  CACHE: 'CACHE',
  DATE: 'DATE',
  INC: 'INC',
  DEC: 'DEC',
  FILTER_BY: 'FILTER_BY',
  FILTER_ID: 'FILTER_ID',
};

// Register.js uses AuthStates to set the database values for role.
export const AuthStates = {
  GUEST: 0,
  DOCTOR: 1,
  NURSE: 2,
  STAFF: 3,
  CEO: 4,
};

export const filterStates = {
  PATIENT: 1,
  DOCTOR: 2,
};

export const employee = {
  id: 0,
  first_name: '',
  last_name: '',
  type: AuthStates.GUEST,
  associated_id: 0,
};

export const defaultDate = {
  year: 0,
  month: 0,
  day: 0,
  hour: 0,
  minute: 0,
};

export const defaultFilter = {
  filterBy: filterStates.DOCTOR,
  id: 0,
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

export function toggleEdit() {
  return {
    type: AppointmentActionTypes.EDIT,
  };
}

export function cacheAppointments(appointments) {
  return {
    type: AppointmentActionTypes.CACHE,
    appointments,
  };
}

export function setDate(date) {
  return {
    type: AppointmentActionTypes.DATE,
    date,
  };
}

export function incMonth() {
  return {
    type: AppointmentActionTypes.INC,
  };
}

export function decMonth() {
  return {
    type: AppointmentActionTypes.DEC,
  };
}

export function filterBy(by) {
  return {
    type: AppointmentActionTypes.FILTER_BY,
    by,
  };
}

export function filterId(id) {
  return {
    type: AppointmentActionTypes.FILTER_ID,
    id,
  };
}
