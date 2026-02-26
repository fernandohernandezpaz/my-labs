import type { PropsWithChildren } from 'react';
import { App, ConfigProvider, theme } from 'antd';

export const AppThemeProvider = ({ children }: PropsWithChildren) => (
  <ConfigProvider
    theme={{
      algorithm: theme.defaultAlgorithm,
      token: {
        borderRadius: 6,
        colorBgLayout: '#f5f7fa',
        colorBorder: '#dcdfe6',
        colorPrimary: '#409eff',
        colorText: '#303133',
        colorTextSecondary: '#606266',
      },
    }}
  >
    <App>{children}</App>
  </ConfigProvider>
);
