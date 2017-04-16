import {
  UserActionTypes,
  AppointmentActionTypes,
  employee,
  defaultDate,
} from './actions.js';

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

function edit(state = false, action) {
  switch (action.type) {
    case UserActionTypes.EDIT:
      return !state;
    default:
      return state;
  }
}

function appointments(state = [], action) {
  switch (action.type) {
    case AppointmentActionTypes.CACHE:
      return action.appointments;
    default:
      return state;
  }
}

function date(state = defaultDate, action) {
  const newDate = action.date;

  switch (action.type) {
    case AppointmentActionTypes.DATE:
      Object.keys(state).forEach((key) => {
        if (!Object.prototype.hasOwnProperty.call(newDate, key)) {
          newDate.key = state.key;
        }
      });

      return newDate;
    default:
      return state;
  }
}

function healthApp(state = {}, action) {
  return {
    user: user(state.user, action),
    edit: edit(state.edit, action),
    appointments: appointments(state.appointments, action),
    date: date(state.date, action),
  };
}

export default healthApp;
