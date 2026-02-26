import { describe, expect, it } from 'vitest';
import { createProductSchema } from '@/features/products/model/product.schema';

describe('createProductSchema', () => {
  it('accepts valid payload', () => {
    const parsed = createProductSchema.parse({
      modelId: '9f9e4c3c-824d-4f22-a8ac-d8f8d91c98f1',
      name: 'Corolla XLE',
      price: 20000,
      stock: 3,
    });

    expect(parsed.stock).toBe(3);
  });

  it('rejects non-integer stock', () => {
    const result = createProductSchema.safeParse({
      modelId: '9f9e4c3c-824d-4f22-a8ac-d8f8d91c98f1',
      name: 'Corolla XLE',
      price: 20000,
      stock: 1.5,
    });

    expect(result.success).toBe(false);
  });
});
