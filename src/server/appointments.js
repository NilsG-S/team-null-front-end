import { cacheAppointments } from 'redux/actions.js';
import { store } from 'AppConfig.jsx';
import { url, dateToKey } from './utils.js';

export function modifyApp(id, request) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `${url}appointments/${id}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = () => {
      reject({
        status: xhr.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send(JSON.stringify(request));
  });
}

export function getUncompApps(month) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${url}appointments/uncompleted/${month}`);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const map = new Map();
        let date;

        JSON.parse(xhr.response).forEach((element) => {
          date = new Date(element.date_time);

          map.set(dateToKey(date), {
            id: element.id,
            employee_id: element.employee_id,
            patient_id: element.patient_id,
            date_time: date,
            completed: element.completed,
          });
        });

        store.dispatch(cacheAppointments(map));
        resolve(map);
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = () => {
      reject({
        status: xhr.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send();
  });
}

export function getUncompAppsByDoctor(uid, month) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${url}appointments/doctor/uncompleted/${uid}/${month}`);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const map = new Map();
        let date;

        JSON.parse(xhr.response).forEach((element) => {
          date = new Date(element.date_time);

          map.set(dateToKey(date), {
            id: element.id,
            employee_id: element.employee_id,
            patient_id: element.patient_id,
            date_time: date,
            completed: element.completed,
          });
        });

        store.dispatch(cacheAppointments(map));
        resolve(map);
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = () => {
      reject({
        status: xhr.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send();
  });
}
