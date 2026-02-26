import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Brand } from './brand.model';
import { Product } from './product.model';

export type ModelEntityCreationAttributes = Pick<
  ModelEntity,
  'name' | 'brandId'
>;

@Table({
  tableName: 'models',
  timestamps: true,
  underscored: true,
})
export class ModelEntity extends Model<
  ModelEntity,
  ModelEntityCreationAttributes
> {
  @PrimaryKey
  @Column({
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
  })
  declare id: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(120),
  })
  declare name: string;

  @ForeignKey(() => Brand)
  @Column({
    allowNull: false,
    type: DataType.UUID,
  })
  declare brandId: string;

  @BelongsTo(() => Brand)
  declare brand: Brand;

  @HasMany(() => Product)
  declare products: Product[];

  static associate(): void {}
}
