import { useCallback, useMemo, useState } from 'react';

const tokenKey = 'admin_access_token';

export const getStoredToken = (): string | null => localStorage.getItem(tokenKey);

export const setStoredToken = (token: string): void => {
  localStorage.setItem(tokenKey, token);
};

export const clearStoredToken = (): void => {
  localStorage.removeItem(tokenKey);
};

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(() => getStoredToken());

  const login = useCallback((nextToken: string) => {
    setStoredToken(nextToken);
    setToken(nextToken);
  }, []);

  const logout = useCallback(() => {
    clearStoredToken();
    setToken(null);
  }, []);

  return useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      login,
      logout,
      token,
    }),
    [login, logout, token],
  );
};
