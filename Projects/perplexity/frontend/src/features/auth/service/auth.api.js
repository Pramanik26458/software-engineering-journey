import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true,
});

api.interceptors.response.use(
  res => res,
  err => Promise.reject(err)
);

export async function register({ email, username, password }) {
  const res = await api.post('/api/auth/register', { email, username, password });
  return res.data;
}

export async function login({ email, password }) {
  const res = await api.post('/api/auth/login', { email, password });
  return res.data;
}

export async function getMe() {
  const res = await api.get('/api/auth/get-me');
  return res.data;
}

export async function logoutApi() {
  const res = await api.post('/api/auth/logout');
  return res.data;
}