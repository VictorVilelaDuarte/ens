import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.95:3333',
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('ensccpv:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
