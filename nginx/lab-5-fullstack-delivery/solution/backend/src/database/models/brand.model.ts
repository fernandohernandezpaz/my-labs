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
import { ModelEntity } from './model.model';
import { User } from './user.model';

export type BrandCreationAttributes = Pick<Brand, 'name' | 'createdBy'>;

@Table({
  tableName: 'brands',
  timestamps: true,
  underscored: true,
})
export class Brand extends Model<Brand, BrandCreationAttributes> {
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
    unique: true,
  })
  declare name: string;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.UUID,
  })
  declare createdBy: string;

  @BelongsTo(() => User)
  declare creator: User;

  @HasMany(() => ModelEntity)
  declare models: ModelEntity[];

  static associate(): void {}
}
