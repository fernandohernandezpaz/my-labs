import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelCtor } from 'sequelize-typescript';
import { BaseRepository } from '@/database/repositories/base.repository';
import { Product } from '@/database/models/product.model';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor(@InjectModel(Product) model: ModelCtor<Product>) {
    super(model);
  }
}
