import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ModelEntity } from './model.model';

export type ProductCreationAttributes = Pick<
  Product,
  'name' | 'price' | 'stock' | 'modelId'
>;

@Table({
  tableName: 'products',
  timestamps: true,
  underscored: true,
})
export class Product extends Model<Product, ProductCreationAttributes> {
  @PrimaryKey
  @Column({
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
  })
  declare id: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(160),
  })
  declare name: string;

  @Column({
    allowNull: false,
    type: DataType.DECIMAL(12, 2),
  })
  declare price: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  declare stock: number;

  @ForeignKey(() => ModelEntity)
  @Column({
    allowNull: false,
    type: DataType.UUID,
  })
  declare modelId: string;

  @BelongsTo(() => ModelEntity)
  declare model: ModelEntity;

  static associate(): void {}
}
