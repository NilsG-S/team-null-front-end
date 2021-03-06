import {
  UserActionTypes,
  AppointmentActionTypes,
  PatientActionTypes,
  paymentActionTypes,
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

function appointments(state = new Map(), action) {
  switch (action.type) {
    case AppointmentActionTypes.CACHE:
      return action.appointments;
    default:
      return state;
  }
}

function date(state = defaultDate, action) {
  let newDate;

  switch (action.type) {
    case AppointmentActionTypes.INC:
      newDate = new Date(state.year, state.month + 1);

      return {
        year: newDate.getFullYear(),
        month: newDate.getMonth(),
        day: state.day,
        hour: state.hour,
        minute: state.minute,
      };
    case AppointmentActionTypes.DEC:
      newDate = new Date(state.year, state.month - 1);

      return {
        year: newDate.getFullYear(),
        month: newDate.getMonth(),
        day: state.day,
        hour: state.hour,
        minute: state.minute,
      };
    case AppointmentActionTypes.DATE:
      newDate = action.date;

      Object.keys(state).forEach((key) => {
        if (!Object.prototype.hasOwnProperty.call(newDate, key)) {
          newDate[key] = state[key];
        }
      });

      return newDate;
    default:
      return state;
  }
}

function doctorId(state = 0, action) {
  switch (action.type) {
    case AppointmentActionTypes.DOC_ID:
      return action.id;
    default:
      return state;
  }
}

function patientId(state = 0, action) {
  switch (action.type) {
    case AppointmentActionTypes.PAT_ID:
      return action.id;
    default:
      return state;
  }
}

function patients(state = new Map(), action) {
  switch (action.type) {
    case PatientActionTypes.CACHE:
      return action.patients;
    default:
      return state;
  }
}

function payment(state = {}, action) {
  switch (action.type) {
    case paymentActionTypes.CACHE:
      return action.payment;
    default:
      return state;
  }
}

function healthApp(state = {}, action) {
  return {
    user: user(state.user, action),
    appointments: appointments(state.appointments, action),
    date: date(state.date, action),
    doctorId: doctorId(state.doctorId, action),
    patientId: patientId(state.patientId, action),
    patients: patients(state.patients, action),
    payment: payment(state.payment, action),
  };
}

export default healthApp;
