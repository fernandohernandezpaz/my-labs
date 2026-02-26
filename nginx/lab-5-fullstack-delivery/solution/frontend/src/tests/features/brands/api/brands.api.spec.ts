import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { createBrand, deleteBrand, getBrands, updateBrand } from '@/features/brands/api/brands.api';

const apiBase = '*/api/v1';

const server = setupServer(
  http.get(`${apiBase}/brand`, () =>
    HttpResponse.json([
      {
        createdAt: '2026-01-01T00:00:00.000Z',
        createdBy: 'user-1',
        id: 'brand-1',
        name: 'Toyota',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
    ]),
  ),
  http.post(`${apiBase}/brand`, async ({ request }) => {
    const body = (await request.json()) as { name: string };
    return HttpResponse.json({
      createdAt: '2026-01-01T00:00:00.000Z',
      createdBy: 'user-1',
      id: 'brand-2',
      name: body.name,
      updatedAt: '2026-01-01T00:00:00.000Z',
    });
  }),
  http.patch(`${apiBase}/brand/:id`, async ({ params, request }) => {
    const body = (await request.json()) as { name?: string };
    return HttpResponse.json({
      createdAt: '2026-01-01T00:00:00.000Z',
      createdBy: 'user-1',
      id: String(params.id),
      name: body.name ?? 'Updated',
      updatedAt: '2026-01-02T00:00:00.000Z',
    });
  }),
  http.delete(`${apiBase}/brand/:id`, () => new HttpResponse(null, { status: 204 })),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('brands.api', () => {
  it('gets brands', async () => {
    const data = await getBrands();
    expect(data).toHaveLength(1);
    expect(data[0]?.name).toBe('Toyota');
  });

  it('creates brand', async () => {
    const data = await createBrand({ name: 'Honda' });
    expect(data.name).toBe('Honda');
  });

  it('updates brand', async () => {
    const data = await updateBrand('brand-1', { name: 'Nissan' });
    expect(data.id).toBe('brand-1');
    expect(data.name).toBe('Nissan');
  });

  it('deletes brand', async () => {
    await expect(deleteBrand('brand-1')).resolves.toBeUndefined();
  });
});
