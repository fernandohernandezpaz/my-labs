export type Brand = {
  createdAt: string;
  createdBy: string;
  id: string;
  name: string;
  updatedAt: string;
};

export type CreateBrandDto = {
  name: string;
};

export type UpdateBrandDto = Partial<CreateBrandDto>;
