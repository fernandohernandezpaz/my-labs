import type { AxiosInstance } from 'axios';
import { clearStoredToken, getStoredToken } from '@/features/auth/hooks/use-auth';

export const setupInterceptors = (client: AxiosInstance): void => {
  client.interceptors.request.use((config) => {
    const token = getStoredToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        clearStoredToken();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    },
  );
};
