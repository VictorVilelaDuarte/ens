import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apiens.servile.com.br',
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('ensccpv:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
