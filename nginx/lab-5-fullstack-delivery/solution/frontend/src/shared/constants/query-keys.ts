export const queryKeys = {
  brandById: (id: string) => ['brand', id] as const,
  brands: ['brands'] as const,
  modelById: (id: string) => ['model', id] as const,
  models: ['models'] as const,
  productById: (id: string) => ['product', id] as const,
  products: ['products'] as const,
};
