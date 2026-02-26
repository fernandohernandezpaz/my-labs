import { describe, expect, it } from 'vitest';
import { createModelSchema } from '@/features/models/model/model.schema';

describe('createModelSchema', () => {
  it('accepts valid payload', () => {
    const parsed = createModelSchema.parse({
      brandId: '9f9e4c3c-824d-4f22-a8ac-d8f8d91c98f1',
      name: 'Corolla',
    });

    expect(parsed.name).toBe('Corolla');
  });

  it('rejects invalid uuid', () => {
    const result = createModelSchema.safeParse({ brandId: 'abc', name: 'Corolla' });
    expect(result.success).toBe(false);
  });
});
