import { url } from './utils.js';

export function getRecordById(id) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${url}records/${id}`);
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
    xhr.send();
  });
}

export function modifyRecord(id, request) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `${url}records/${id}`);
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
