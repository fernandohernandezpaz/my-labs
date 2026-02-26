import { describe, expect, it } from 'vitest';
import { createBrandSchema } from '@/features/brands/model/brand.schema';

describe('createBrandSchema', () => {
  it('accepts valid payload', () => {
    const parsed = createBrandSchema.parse({ name: 'Toyota' });
    expect(parsed.name).toBe('Toyota');
  });

  it('rejects empty name', () => {
    const result = createBrandSchema.safeParse({ name: '' });
    expect(result.success).toBe(false);
  });
});
