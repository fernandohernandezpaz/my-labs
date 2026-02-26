import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelCtor } from 'sequelize-typescript';
import { BaseRepository } from '@/database/repositories/base.repository';
import { Brand } from '@/database/models/brand.model';

@Injectable()
export class BrandRepository extends BaseRepository<Brand> {
  constructor(@InjectModel(Brand) model: ModelCtor<Brand>) {
    super(model);
  }
}
