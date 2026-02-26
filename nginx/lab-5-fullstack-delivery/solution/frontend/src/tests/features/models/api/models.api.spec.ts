import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { createModel, deleteModel, getModels, updateModel } from '@/features/models/api/models.api';

const apiBase = '*/api/v1';

const server = setupServer(
  http.get(`${apiBase}/model`, () =>
    HttpResponse.json([
      {
        brandId: 'brand-1',
        createdAt: '2026-01-01T00:00:00.000Z',
        id: 'model-1',
        name: 'Corolla',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
    ]),
  ),
  http.post(`${apiBase}/model`, async ({ request }) => {
    const body = (await request.json()) as { brandId: string; name: string };
    return HttpResponse.json({
      brandId: body.brandId,
      createdAt: '2026-01-01T00:00:00.000Z',
      id: 'model-2',
      name: body.name,
      updatedAt: '2026-01-01T00:00:00.000Z',
    });
  }),
  http.patch(`${apiBase}/model/:id`, async ({ params, request }) => {
    const body = (await request.json()) as { brandId?: string; name?: string };
    return HttpResponse.json({
      brandId: body.brandId ?? 'brand-1',
      createdAt: '2026-01-01T00:00:00.000Z',
      id: String(params.id),
      name: body.name ?? 'Updated model',
      updatedAt: '2026-01-02T00:00:00.000Z',
    });
  }),
  http.delete(`${apiBase}/model/:id`, () => new HttpResponse(null, { status: 204 })),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('models.api', () => {
  it('gets models', async () => {
    const data = await getModels();
    expect(data).toHaveLength(1);
    expect(data[0]?.name).toBe('Corolla');
  });

  it('creates model', async () => {
    const data = await createModel({ brandId: 'brand-1', name: 'Sentra' });
    expect(data.brandId).toBe('brand-1');
    expect(data.name).toBe('Sentra');
  });

  it('updates model', async () => {
    const data = await updateModel('model-1', { name: 'RAV4' });
    expect(data.id).toBe('model-1');
    expect(data.name).toBe('RAV4');
  });

  it('deletes model', async () => {
    await expect(deleteModel('model-1')).resolves.toBeUndefined();
  });
});
