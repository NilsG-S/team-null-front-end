// action types

export const UserActionTypes = {
  UPDATE: 'UPDATE',
  LOGOUT: 'LOGOUT',
};

export const AppointmentActionTypes = {
  EDIT: 'EDIT',
  CACHE: 'CACHE',
  YEAR: 'YEAR',
  MONTH: 'MONTH',
  DAY: 'DAY',
  HOURS: 'HOURS',
  MINUTES: 'MINUTES',
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

export function setYear(year) {
  return {
    type: AppointmentActionTypes.YEAR,
    year,
  };
}

export function setMonth(month) {
  return {
    type: AppointmentActionTypes.MONTH,
    month,
  };
}

export function setDay(day) {
  return {
    type: AppointmentActionTypes.DAY,
    day,
  };
}

export function setHours(hours) {
  return {
    type: AppointmentActionTypes.HOURS,
    hours,
  };
}

export function setMinutes(minutes) {
  return {
    type: AppointmentActionTypes.MINUTES,
    minutes,
  };
}
