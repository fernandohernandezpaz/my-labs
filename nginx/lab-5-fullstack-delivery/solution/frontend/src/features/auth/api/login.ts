import { httpClient } from '@/shared/api/http-client';
import type { AuthTokenPayload } from '@/features/auth/model/auth.types';

export type LoginRequest = {
  password: string;
  username: string;
};

export const login = async (payload: LoginRequest): Promise<AuthTokenPayload> => {
  const { data } = await httpClient.post<AuthTokenPayload>('/auth/login', payload);
  return data;
};
