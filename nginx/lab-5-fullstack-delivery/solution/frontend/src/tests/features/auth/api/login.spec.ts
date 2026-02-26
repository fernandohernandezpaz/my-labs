import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { login } from '@/features/auth/api/login';

const server = setupServer(
  http.post('*/api/v1/auth/login', async () =>
    HttpResponse.json({ accessToken: 'test-token' }),
  ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('login api', () => {
  it('returns token payload', async () => {
    const data = await login({ password: 'admin123.', username: 'admin' });
    expect(data.accessToken).toBe('test-token');
  });
});
