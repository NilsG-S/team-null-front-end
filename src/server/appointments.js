import { cacheAppointments } from 'redux/actions.js';
import { store } from 'AppConfig.jsx';

function genDates() {
  const state = store.getState();
  const year = state.year;
  const month = state.month;
  const array = [];
  let id = 1;
  let minutes;

  for (let i = 1; i < 21; i += 1) {
    for (let j = 8; j < 5; j += 1) {
      for (let k = 0; k < 2; k += 1) {
        minutes = k * 30;

        array.push([
          id,
          1,
          1,
          new Date(year, month, i, j, minutes),
          2,
        ]);

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
