import { cacheAppointments } from 'redux/actions.js';
import { store } from 'AppConfig.jsx';

function genDates() {
  const year = 2017;
  const month = 3;
  const array = [];
  let id = 1;
  let minutes;

  for (let i = 3; i < 7; i += 1) {
    for (let j = 8; j < 17; j += 1) {
      for (let k = 0; k < 2; k += 1) {
        minutes = k * 30;

        array.push({
          id: id,
          employee_id: 1,
          patient_id: 1,
          date_time: new Date(year, month, i, j, minutes),
          completed: 2,
        });

        id += 1;
      }
    }
  }

  for (let j = 8; j < 13; j += 1) {
    for (let k = 0; k < 2; k += 1) {
      minutes = k * 30;

      array.push({
        id: id,
        employee_id: 1,
        patient_id: 1,
        date_time: new Date(year, month, 7, j, minutes),
        completed: 2,
      });

      id += 1;
    }
  }

  return array;
}

export function dateToKey(date) {
  return date.toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}

export function getAll() {
  return new Promise((resolve, reject) => {
    const map = new Map();

    genDates().forEach((element) => {
      map.set(dateToKey(element.date_time), {
        id: element.id,
        employee_id: element.employee_id,
        patient_id: element.patient_id,
        date_time: element.date_time,
        completed: element.completed,
      });
    });

    store.dispatch(cacheAppointments(map));
    resolve();
  });
}
