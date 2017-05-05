// action types

export const UserActionTypes = {
  UPDATE: 'UPDATE',
  LOGOUT: 'LOGOUT',
};

export const AppointmentActionTypes = {
  CACHE: 'CACHE',
  DATE: 'DATE',
  INC: 'INC',
  DEC: 'DEC',
  DOC_ID: 'DOC_ID',
  PAT_ID: 'PAT_ID',
};

// Register.js uses AuthStates to set the database values for role.
export const AuthStates = {
  GUEST: 0,
  DOCTOR: 1,
  NURSE: 2,
  STAFF: 3,
  CEO: 4,
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

export function setDoctorId(id) {
  return {
    type: AppointmentActionTypes.DOC_ID,
    id,
  };
}

export function setPatientId(id) {
  return {
    type: AppointmentActionTypes.PAT_ID,
    id,
  };
}
