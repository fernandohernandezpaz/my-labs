import type { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getStoredToken } from '@/features/auth/hooks/use-auth';
import { ROUTES } from '@/shared/constants/routes';

export const RequireAuth = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const token = getStoredToken();

  if (!token) {
    return <Navigate to={ROUTES.login} replace state={{ from: location.pathname }} />;
  }

  return children;
};
