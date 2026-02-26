import { Injectable } from '@nestjs/common';
import { CreationAttributes, Transaction, WhereOptions } from 'sequelize';
import { Identifier } from 'sequelize/types';
import { Model, ModelCtor } from 'sequelize-typescript';
import { PrimaryKeyType } from './types/primary-key.types';

@Injectable()
export abstract class BaseRepository<
  M extends Model<M, CreationAttributes<M>>,
> {
  protected constructor(protected readonly model: ModelCtor<M>) {}

  create(data: CreationAttributes<M>, transaction?: Transaction): Promise<M> {
    return this.model.create(data, { transaction });
  }

  async transaction<T>(fn: (t: Transaction) => PromiseLike<T>): Promise<T> {
    if (!this.model.sequelize) {
      throw new Error('Model sequelize not defined');
    }

    return this.model.sequelize.transaction((t) => fn(t));
  }

  findOneById(
    id: PrimaryKeyType<M>,
    transaction?: Transaction,
  ): Promise<M | null> {
    return this.model.findByPk(id as Identifier, {
      transaction,
    });
  }

  findOne(
    where: WhereOptions<M>,
    transaction?: Transaction,
  ): Promise<M | null> {
    return this.model.findOne({ transaction, where });
  }

  findAll(where?: WhereOptions<M>, transaction?: Transaction): Promise<M[]> {
    return this.model.findAll({ transaction, where });
  }

  async updateOne(
    id: PrimaryKeyType<M>,
    data: Partial<M>,
    transaction?: Transaction,
  ): Promise<boolean> {
    const primaryKeyField = this.model.primaryKeyAttribute;

    if (!primaryKeyField) {
      throw new Error('Primary key not defined on model');
    }

    const [affectedCount] = await this.model.update(data, {
      transaction,
      where: { [primaryKeyField]: id } as WhereOptions<M>,
    });

    return affectedCount > 0;
  }

  deleteBy(where: WhereOptions<M>, transaction?: Transaction): Promise<number> {
    return this.model.destroy({ transaction, where });
  }

  async existsBy(
    where: WhereOptions<M>,
    transaction?: Transaction,
  ): Promise<boolean> {
    return !!(await this.model.findOne({
      attributes: ['id'],
      raw: true,
      transaction,
      where,
    }));
  }
}
