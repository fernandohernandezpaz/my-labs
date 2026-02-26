import { useEffect } from 'react';
import { Button, Card, Form, Input, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';
import { useLogin } from '@/features/auth/hooks/use-login';
import { getStoredToken, setStoredToken } from '@/features/auth/hooks/use-auth';
import { useNotification } from '@/shared/hooks/use-notification';
import { toApiError } from '@/shared/utils/errors';

const schema = z.object({
  password: z.string().min(1, 'Password is required'),
  username: z.string().min(1, 'Username is required'),
});

type LoginForm = z.infer<typeof schema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { success, error } = useNotification();
  const loginMutation = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      password: '',
      username: '',
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (getStoredToken()) {
      navigate(ROUTES.admin, { replace: true });
    }
  }, [navigate]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await loginMutation.mutateAsync(values);
      setStoredToken(response.accessToken);
      success('Login successful');

      const from = (location.state as { from?: string } | null)?.from ?? ROUTES.admin;
      navigate(from, { replace: true });
    } catch (err) {
      const parsed = toApiError(err);
      error('Login failed', parsed.message);
    }
  });

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 16,
      }}
    >
      <Card title="Admin Login" style={{ maxWidth: 420, width: '100%' }}>
        <Form layout="vertical" onFinish={onSubmit}>
          <Form.Item
            help={errors.username?.message}
            label="Username"
            validateStatus={errors.username ? 'error' : ''}
          >
            <Controller
              control={control}
              name="username"
              render={({ field }) => <Input {...field} autoComplete="username" />}
            />
          </Form.Item>

          <Form.Item
            help={errors.password?.message}
            label="Password"
            validateStatus={errors.password ? 'error' : ''}
          >
            <Controller
              control={control}
              name="password"
              render={({ field }) => <Input.Password {...field} autoComplete="current-password" />}
            />
          </Form.Item>

          <Button block htmlType="submit" loading={loginMutation.isPending} type="primary">
            Sign in
          </Button>
          <Typography.Paragraph type="secondary" style={{ marginTop: 12, marginBottom: 0 }}>
            Seed user: admin / admin123.
          </Typography.Paragraph>
        </Form>
      </Card>
    </div>
  );
};
