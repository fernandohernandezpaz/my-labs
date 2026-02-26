import { describe, expect, it } from 'vitest';
import axios from 'axios';
import { toApiError } from '@/shared/utils/errors';

describe('toApiError', () => {
  it('maps standard Error', () => {
    const parsed = toApiError(new Error('boom'));
    expect(parsed.message).toBe('boom');
    expect(parsed.status).toBe(500);
  });

  it('maps axios error with response', () => {
    const error = new axios.AxiosError('Request failed');
    Object.assign(error, {
      response: {
        data: { message: 'Unauthorized' },
        status: 401,
      },
    });

    const parsed = toApiError(error);
    expect(parsed.message).toBe('Unauthorized');
    expect(parsed.status).toBe(401);
  });

  it('falls back for unknown error', () => {
    const parsed = toApiError('oops');
    expect(parsed.message).toBe('Unexpected error');
  });
});
