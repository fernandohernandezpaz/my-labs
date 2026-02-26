import { httpClient } from '@/shared/api/http-client';
import type { Brand, CreateBrandDto, UpdateBrandDto } from '@/features/brands/model/brand.types';

export const getBrands = async (): Promise<Brand[]> => {
  const { data } = await httpClient.get<Brand[]>('/brand');
  return data;
};

export const createBrand = async (payload: CreateBrandDto): Promise<Brand> => {
  const { data } = await httpClient.post<Brand>('/brand', payload);
  return data;
};

export const updateBrand = async (id: string, payload: UpdateBrandDto): Promise<Brand> => {
  const { data } = await httpClient.patch<Brand>(`/brand/${id}`, payload);
  return data;
};

export const deleteBrand = async (id: string): Promise<void> => {
  await httpClient.delete(`/brand/${id}`);
};
