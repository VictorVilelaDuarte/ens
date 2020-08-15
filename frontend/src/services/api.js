import axios from 'axios';

const api = axios.create({
  baseURL: 'http://167.172.157.226:3333',
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('ensccpv:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
