import { dateToKey } from 'server';

export const CALENDAR_PATHS = {
  RECORD: '/record',
  DOCTOR_CALENDAR: '/calendar',
  DOCTOR_SCHEDULE: '/calendar/schedule',
  PATIENT: '/patient',
  PATIENT_CALENDAR: '/patient/calendar',
  PATIENT_SCHEDULE: '/patient/schedule',
  APPOINTMENT: '/appointment',
  APPOINTMENT_CALENDAR: '/appointment/calendar',
  APPOINTMENT_SCHEDULE: '/appointment/schedule',
};

export function oneFilled(appointments, date) {
  const current = new Date();
  let minutes;
  let tempDate;

  for (let j = 8; j < 17; j += 1) {
    for (let k = 0; k < 2; k += 1) {
      minutes = k * 30;
      tempDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        j,
        minutes,
      );

      if (tempDate.getTime() >= current.getTime()) {
        if (appointments.has(dateToKey(tempDate))) {
          return true;
        }
      }
    }
  }

  return false;
}

export function oneFree(appointments, date) {
  const current = new Date();
  let minutes;
  let tempDate;

  for (let j = 8; j < 17; j += 1) {
    for (let k = 0; k < 2; k += 1) {
      minutes = k * 30;
      tempDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        j,
        minutes,
      );

      if (tempDate.getTime() >= current.getTime()) {
        if (!appointments.has(dateToKey(tempDate))) {
          return true;
        }
      }
    }
  }

  return false;
}
