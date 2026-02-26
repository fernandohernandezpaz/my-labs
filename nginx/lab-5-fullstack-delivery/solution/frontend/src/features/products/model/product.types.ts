export type Product = {
  createdAt: string;
  id: string;
  modelId: string;
  name: string;
  price: number;
  stock: number;
  updatedAt: string;
};

export type CreateProductDto = {
  modelId: string;
  name: string;
  price: number;
  stock: number;
};

export type UpdateProductDto = Partial<CreateProductDto>;
