import axios from 'axios';
import type { ApiError } from '@/shared/api/types';

export const toApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      details: error.response?.data,
      message:
        (error.response?.data as { message?: string } | undefined)?.message ??
        error.message ??
        'Request failed',
      status: error.response?.status ?? 500,
    };
  }

  if (error instanceof Error) {
    return { message: error.message, status: 500 };
  }

  return { message: 'Unexpected error', status: 500 };
};
