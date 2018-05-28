import config from '../config';

const { API } = config;

export function fetchPackages() {
  return fetch(`${API}/package`, {
    method: 'GET',
  })
  .then(response => response.json())
};
