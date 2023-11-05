import axios from 'axios';

import { url } from '@/shared/mocks/api';

export const $axios = axios.create({
  baseURL: url,
  withCredentials: true,
});

$axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await $axios.post('auth/refresh');
        return $axios(originalRequest);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  },
);
