import { cachePatients } from 'redux/actions.js';
import { store } from 'AppConfig.jsx';
import { url } from './utils.js';

export function createPatient(patient) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${url}patients`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const newMap = new Map(store.getState().patients);
        const newPatient = patient;

        newPatient.id = xhr.getResponseHeader('Location');
        newMap.set(patient.id, newPatient);

        store.dispatch(cachePatients(newMap));
        resolve();
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
    xhr.send(JSON.stringify(patient));
  });
}

export function getAllPatients() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${url}patients`);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const map = new Map();

        JSON.parse(xhr.response).forEach((element) => {
          map.set(element.id, element);
        });

        store.dispatch(cachePatients(map));
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
