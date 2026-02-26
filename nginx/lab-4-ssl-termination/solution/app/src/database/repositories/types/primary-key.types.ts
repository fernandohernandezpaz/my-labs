import { Model } from 'sequelize-typescript';

export type PrimaryKeyType<M extends Model> = M extends { id: infer IdType }
  ? IdType
  : string;
