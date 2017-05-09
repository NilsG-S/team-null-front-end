import { updateUser, logoutUser } from 'redux/actions.js';
import { store } from 'AppConfig.jsx';
import { url } from './utils.js';

export function signOut() {
  return new Promise((resolve, reject) => {
    store.dispatch(logoutUser());
    resolve();
  });
}

export function login(id, password) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${url}auth`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const user = JSON.parse(xhr.response);

        store.dispatch(updateUser(user));

        resolve(user);
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
    xhr.send(JSON.stringify({
      id,
      password,
    }));
  });
}
