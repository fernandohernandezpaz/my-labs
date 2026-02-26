import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelCtor } from 'sequelize-typescript';
import { BaseRepository } from '@/database/repositories/base.repository';
import { ModelEntity } from '@/database/models/model.model';

@Injectable()
export class ModelRepository extends BaseRepository<ModelEntity> {
  constructor(@InjectModel(ModelEntity) model: ModelCtor<ModelEntity>) {
    super(model);
  }
}
