import axios from 'axios';
import { env } from '@/shared/config/env';
import { setupInterceptors } from './interceptors';

export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

setupInterceptors(httpClient);
