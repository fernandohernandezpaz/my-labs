import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginPage } from '@/features/auth/pages/login-page';
import { ROUTES } from '@/shared/constants/routes';

const navigateMock = vi.fn();
const mutateAsyncMock = vi.fn();
const successMock = vi.fn();
const errorMock = vi.fn();
const getStoredTokenMock = vi.fn<() => string | null>();
const setStoredTokenMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({ state: { from: '/admin/products' } }),
    useNavigate: () => navigateMock,
  };
});

vi.mock('@/features/auth/hooks/use-login', () => ({
  useLogin: () => ({
    isPending: false,
    mutateAsync: mutateAsyncMock,
  }),
}));

vi.mock('@/features/auth/hooks/use-auth', () => ({
  getStoredToken: () => getStoredTokenMock(),
  setStoredToken: (token: string) => setStoredTokenMock(token),
}));

vi.mock('@/shared/hooks/use-notification', () => ({
  useNotification: () => ({
    error: errorMock,
    success: successMock,
  }),
}));

describe('LoginPage', () => {
  beforeEach(() => {
    navigateMock.mockReset();
    mutateAsyncMock.mockReset();
    successMock.mockReset();
    errorMock.mockReset();
    setStoredTokenMock.mockReset();
    getStoredTokenMock.mockReset();
    getStoredTokenMock.mockReturnValue(null);
  });

  it('redirects to admin when a token already exists', () => {
    getStoredTokenMock.mockReturnValue('token');

    render(<LoginPage />);

    expect(navigateMock).toHaveBeenCalledWith(ROUTES.admin, { replace: true });
  });

  it('submits credentials and redirects to previous route', async () => {
    mutateAsyncMock.mockResolvedValue({ accessToken: 'jwt-token' });
    const user = userEvent.setup();

    render(<LoginPage />);

    const usernameInput = document.querySelector('input[name="username"]');
    const passwordInput = document.querySelector('input[name="password"]');
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();

    await user.type(usernameInput as Element, 'admin');
    await user.type(passwordInput as Element, 'admin123.');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
      expect(mutateAsyncMock).toHaveBeenCalledWith({
        password: 'admin123.',
        username: 'admin',
      });
      expect(setStoredTokenMock).toHaveBeenCalledWith('jwt-token');
      expect(successMock).toHaveBeenCalledWith('Login successful');
      expect(navigateMock).toHaveBeenCalledWith('/admin/products', { replace: true });
    });
  });
});
