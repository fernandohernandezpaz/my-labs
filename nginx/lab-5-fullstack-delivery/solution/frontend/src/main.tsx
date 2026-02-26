import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppQueryProvider } from '@/app/providers/query-provider';
import { AppRouterProvider } from '@/app/providers/router-provider';
import { AppThemeProvider } from '@/app/providers/theme-provider';
import '@/app/styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppThemeProvider>
      <AppQueryProvider>
        <AppRouterProvider />
      </AppQueryProvider>
    </AppThemeProvider>
  </React.StrictMode>,
);
