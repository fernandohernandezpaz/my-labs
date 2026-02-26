export type ModelEntity = {
  brandId: string;
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
};

export type CreateModelDto = {
  brandId: string;
  name: string;
};

export type UpdateModelDto = Partial<CreateModelDto>;
