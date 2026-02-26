import { httpClient } from '@/shared/api/http-client';
import type { CreateModelDto, ModelEntity, UpdateModelDto } from '@/features/models/model/model.types';

export const getModels = async (): Promise<ModelEntity[]> => {
  const { data } = await httpClient.get<ModelEntity[]>('/model');
  return data;
};

export const createModel = async (payload: CreateModelDto): Promise<ModelEntity> => {
  const { data } = await httpClient.post<ModelEntity>('/model', payload);
  return data;
};

export const updateModel = async (id: string, payload: UpdateModelDto): Promise<ModelEntity> => {
  const { data } = await httpClient.patch<ModelEntity>(`/model/${id}`, payload);
  return data;
};

export const deleteModel = async (id: string): Promise<void> => {
  await httpClient.delete(`/model/${id}`);
};
