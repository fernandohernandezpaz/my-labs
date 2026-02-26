export const authFixture = {
  password: 'admin123',
  userId: '5f53b853-1e59-49af-a899-b35f91135f5c',
  username: 'admin',
};

export const brandFixture = {
  createdAt: new Date('2026-02-20T00:00:00.000Z'),
  createdBy: authFixture.userId,
  id: 'b6d5cf3d-60ca-4b65-b9f4-8e7ba3f54841',
  name: 'Toyota',
  updatedAt: new Date('2026-02-20T00:00:00.000Z'),
};

export const modelFixture = {
  brandId: brandFixture.id,
  createdAt: new Date('2026-02-20T00:00:00.000Z'),
  id: '77f8a3ff-5546-49dc-9322-a3752a71873a',
  name: 'Corolla',
  updatedAt: new Date('2026-02-20T00:00:00.000Z'),
};

export const productFixture = {
  createdAt: new Date('2026-02-20T00:00:00.000Z'),
  id: '1fd4bc3b-20e1-40f8-ae3d-bcc89acc13e9',
  modelId: modelFixture.id,
  name: 'Corolla XLE',
  price: 23000,
  stock: 3,
  updatedAt: new Date('2026-02-20T00:00:00.000Z'),
};
