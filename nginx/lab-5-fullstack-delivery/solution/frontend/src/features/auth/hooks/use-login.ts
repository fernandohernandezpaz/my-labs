import { useMutation } from '@tanstack/react-query';
import { login, type LoginRequest } from '@/features/auth/api/login';
import { toApiError } from '@/shared/utils/errors';

export const useLogin = () =>
  useMutation({
    mutationFn: (payload: LoginRequest) => login(payload),
    meta: {
      parseError: toApiError,
    },
  });
