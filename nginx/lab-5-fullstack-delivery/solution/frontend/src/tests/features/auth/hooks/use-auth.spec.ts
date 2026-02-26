import { beforeEach, describe, expect, it } from 'vitest';
import { clearStoredToken, getStoredToken, setStoredToken } from '@/features/auth/hooks/use-auth';

describe('use-auth storage helpers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('stores and gets token', () => {
    setStoredToken('abc-123');
    expect(getStoredToken()).toBe('abc-123');
  });

  it('clears token', () => {
    setStoredToken('abc-123');
    clearStoredToken();
    expect(getStoredToken()).toBeNull();
  });
});
