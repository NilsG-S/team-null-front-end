import { cachePayment } from 'redux/actions.js';
import { store } from 'AppConfig.jsx';
import { url } from './utils.js';

export function modifyPaymentById(id, request) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `${url}payments/${id}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const payment = JSON.parse(xhr.response);

        store.dispatch(cachePayment(payment));

        resolve(payment);
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

export function getPaymentById(id) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${url}payments/${id}`);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const payment = JSON.parse(xhr.response);

        store.dispatch(cachePayment(payment));

        resolve(payment);
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
