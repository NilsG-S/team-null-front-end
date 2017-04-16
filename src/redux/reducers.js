import {
  UserActionTypes,
  AppointmentActionTypes,
  employee,
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

function year(state = 0, action) {
  switch (action.type) {
    case AppointmentActionTypes.YEAR:
      return action.year;
    default:
      return state;
  }
}

function month(state = 0, action) {
  switch (action.type) {
    case AppointmentActionTypes.MONTH:
      return action.month;
    default:
      return state;
  }
}

function day(state = 0, action) {
  switch (action.type) {
    case AppointmentActionTypes.DAY:
      return action.day;
    default:
      return state;
  }
}

function hours(state = 0, action) {
  switch (action.type) {
    case AppointmentActionTypes.HOURS:
      return action.hours;
    default:
      return state;
  }
}

function minutes(state = 0, action) {
  switch (action.type) {
    case AppointmentActionTypes.MINUTES:
      return action.minutes;
    default:
      return state;
  }
}

function healthApp(state = {}, action) {
  return {
    user: user(state.user, action),
    edit: edit(state.edit, action),
    appointments: appointments(state.appointments, action),
    year: year(state.year, action),
    month: month(state.month, action),
    day: day(state.day, action),
    hours: hours(state.hours, action),
    minutes: minutes(state.minutes, action),
  };
}

export default healthApp;
