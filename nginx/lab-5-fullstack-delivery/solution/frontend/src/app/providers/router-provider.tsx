import { RouterProvider } from 'react-router-dom';
import { appRouter } from '@/app/router';

export const AppRouterProvider = () => <RouterProvider router={appRouter} />;
