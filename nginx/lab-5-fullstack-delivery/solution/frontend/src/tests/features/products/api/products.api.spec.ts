import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { createProduct, deleteProduct, getProducts, updateProduct } from '@/features/products/api/products.api';

const apiBase = '*/api/v1';

const server = setupServer(
  http.get(`${apiBase}/product`, () =>
    HttpResponse.json([
      {
        createdAt: '2026-01-01T00:00:00.000Z',
        id: 'product-1',
        modelId: 'model-1',
        name: 'Corolla XLE',
        price: 23000,
        stock: 5,
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
    ]),
  ),
  http.post(`${apiBase}/product`, async ({ request }) => {
    const body = (await request.json()) as {
      modelId: string;
      name: string;
      price: number;
      stock: number;
    };

    return HttpResponse.json({
      createdAt: '2026-01-01T00:00:00.000Z',
      id: 'product-2',
      modelId: body.modelId,
      name: body.name,
      price: body.price,
      stock: body.stock,
      updatedAt: '2026-01-01T00:00:00.000Z',
    });
  }),
  http.patch(`${apiBase}/product/:id`, async ({ params, request }) => {
    const body = (await request.json()) as {
      modelId?: string;
      name?: string;
      price?: number;
      stock?: number;
    };

    return HttpResponse.json({
      createdAt: '2026-01-01T00:00:00.000Z',
      id: String(params.id),
      modelId: body.modelId ?? 'model-1',
      name: body.name ?? 'Updated product',
      price: body.price ?? 21000,
      stock: body.stock ?? 7,
      updatedAt: '2026-01-02T00:00:00.000Z',
    });
  }),
  http.delete(`${apiBase}/product/:id`, () => new HttpResponse(null, { status: 204 })),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('products.api', () => {
  it('gets products', async () => {
    const data = await getProducts();
    expect(data).toHaveLength(1);
    expect(data[0]?.name).toBe('Corolla XLE');
  });

  it('creates product', async () => {
    const data = await createProduct({
      modelId: 'model-1',
      name: 'Corolla LE',
      price: 22000,
      stock: 3,
    });

    expect(data.name).toBe('Corolla LE');
    expect(data.price).toBe(22000);
  });

  it('updates product', async () => {
    const data = await updateProduct('product-1', { stock: 9 });
    expect(data.id).toBe('product-1');
    expect(data.stock).toBe(9);
  });

  it('deletes product', async () => {
    await expect(deleteProduct('product-1')).resolves.toBeUndefined();
  });
});
