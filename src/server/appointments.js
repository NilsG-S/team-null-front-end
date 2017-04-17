import { cacheAppointments } from 'redux/actions.js';
import { store } from 'AppConfig.jsx';

function genDates() {
  const year = 2017;
  const month = 3;
  const array = [];
  let id = 1;
  let minutes;

  for (let i = 1; i < 6; i += 1) {
    for (let j = 8; j < 17; j += 1) {
      for (let k = 0; k < 2; k += 1) {
        minutes = k * 30;

        array.push({
          appointment_id: id,
          employee_id: 1,
          patient_id: 1,
          date_time: new Date(year, month, i, j, minutes),
          completed: 2,
        });

        id += 1;
      }
    }
  }

  return array;
}

export function getAll() {
  return new Promise((resolve, reject) => {
    const appointments = genDates();
    store.dispatch(cacheAppointments(appointments));
    resolve(appointments);
  });
}
