import { describe, expect, it } from 'vitest';
import { toCurrency, toDateTime } from '@/shared/utils/format';

describe('format utils', () => {
  it('formats currency', () => {
    expect(toCurrency(1234.5)).toContain('1,234.50');
  });

  it('formats date time into string', () => {
    const value = toDateTime('2026-01-01T00:00:00.000Z');
    expect(typeof value).toBe('string');
    expect(value.length).toBeGreaterThan(0);
  });
});
