import { App } from 'antd';

export const useNotification = () => {
  const { notification } = App.useApp();

  return {
    error: (message: string, description?: string) =>
      notification.error({ description, message }),
    success: (message: string, description?: string) =>
      notification.success({ description, message }),
  };
};
