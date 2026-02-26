import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Brand } from './brand.model';

export type UserCreationAttributes = Pick<User, 'username' | 'password'>;

@Table({
  tableName: 'users',
  timestamps: true,
  underscored: true,
})
export class User extends Model<User, UserCreationAttributes> {
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
  declare username: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(255),
  })
  declare password: string;

  @HasMany(() => Brand)
  declare brands: Brand[];

  static associate(): void {}
}
