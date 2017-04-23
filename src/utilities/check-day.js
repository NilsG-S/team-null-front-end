import { dateToKey } from 'server';

export function oneFilled(appointments, date) {
  let minutes;

  for (let j = 8; j < 17; j += 1) {
    for (let k = 0; k < 2; k += 1) {
      minutes = k * 30;

      if (appointments.has(dateToKey(new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        j,
        minutes,
      )))) {
        return true;
      }
    }
  }

  return false;
}

export function oneFree(appointments, date) {
  let minutes;

  for (let j = 8; j < 17; j += 1) {
    for (let k = 0; k < 2; k += 1) {
      minutes = k * 30;

      if (!appointments.has(dateToKey(new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        j,
        minutes,
      )))) {
        return true;
      }
    }
  }

  return false;
}
