import axios from 'axios';

export const coinloreApi = axios.create({
  baseURL: 'https://api.coinlore.net/api',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});
