import axios from 'axios';
import router from '../router';
import { useNotification } from './notificationService';

const { notify } = useNotification();

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para manejar errores globales (como expiración de sesión)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      notify('Tu sesión ha expirado o no tienes permisos. Por favor, ingresa de nuevo.', 'error');
      router.push('/');
    }
    return Promise.reject(error);
  }
);

export default api;
