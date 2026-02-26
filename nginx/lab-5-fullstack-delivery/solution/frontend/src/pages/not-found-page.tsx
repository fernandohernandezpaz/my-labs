import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Result
      extra={
        <Button type="primary" onClick={() => navigate(ROUTES.admin)}>
          Back to Dashboard
        </Button>
      }
      status="404"
      title="404"
      subTitle="Page not found"
    />
  );
};
