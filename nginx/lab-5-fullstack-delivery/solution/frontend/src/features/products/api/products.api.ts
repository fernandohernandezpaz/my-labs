import { httpClient } from '@/shared/api/http-client';
import type { CreateProductDto, Product, UpdateProductDto } from '@/features/products/model/product.types';

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await httpClient.get<Product[]>('/product');
  return data;
};

export const createProduct = async (payload: CreateProductDto): Promise<Product> => {
  const { data } = await httpClient.post<Product>('/product', payload);
  return data;
};

export const updateProduct = async (id: string, payload: UpdateProductDto): Promise<Product> => {
  const { data } = await httpClient.patch<Product>(`/product/${id}`, payload);
  return data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await httpClient.delete(`/product/${id}`);
};
