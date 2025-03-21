import axios from 'axios';

export const API_BASE_URL = 'https://university.hmdev.com.br';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
