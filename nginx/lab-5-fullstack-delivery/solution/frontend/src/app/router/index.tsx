import { Navigate, createBrowserRouter } from 'react-router-dom';
import { RequireAuth } from './guards';
import { ROUTES } from '@/shared/constants/routes';
import { AdminLayout } from '@/shared/ui/layout/admin-layout';
import { LoginPage } from '@/features/auth/pages/login-page';
import { DashboardPage } from '@/pages/dashboard-page';
import { BrandsPage } from '@/features/brands/pages/brands-page';
import { ModelsPage } from '@/features/models/pages/models-page';
import { ProductsPage } from '@/features/products/pages/products-page';
import { NotFoundPage } from '@/pages/not-found-page';

export const appRouter = createBrowserRouter([
  {
    path: ROUTES.login,
    element: <LoginPage />,
  },
  {
    path: ROUTES.admin,
    element: (
      <RequireAuth>
        <AdminLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'brands',
        element: <BrandsPage />,
      },
      {
        path: 'models',
        element: <ModelsPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to={ROUTES.admin} replace />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
