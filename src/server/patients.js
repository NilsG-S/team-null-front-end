import { cachePatients } from 'redux/actions.js';
import { store } from 'AppConfig.jsx';
import { url } from './utils.js';

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
