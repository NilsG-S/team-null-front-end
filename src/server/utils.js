export const url = 'http://54.173.116.97:3000/';

export function dateToKey(date) {
  return date.toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}
