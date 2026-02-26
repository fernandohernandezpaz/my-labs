import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GlobalConfigsModule } from '@/configs/global-configs.module';
import { GlobalConfigsService } from '@/configs/global-configs.service';
import { Brand } from './models/brand.model';
import { ModelEntity } from './models/model.model';
import { Product } from './models/product.model';
import { User } from './models/user.model';
import {
  BrandRepository,
  ModelRepository,
  ProductRepository,
  UserRepository,
} from './repositories';

export const UserModelToken = 'UserModelToken';
export const UserRepositoryToken = 'UserRepositoryToken';
export const BrandModelToken = 'BrandModelToken';
export const BrandRepositoryToken = 'BrandRepositoryToken';
export const ModelEntityModelToken = 'ModelEntityModelToken';
export const ModelRepositoryToken = 'ModelRepositoryToken';
export const ProductModelToken = 'ProductModelToken';
export const ProductRepositoryToken = 'ProductRepositoryToken';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [GlobalConfigsModule],
      inject: [GlobalConfigsService],
      useFactory: (globalConfigsService: GlobalConfigsService) => {
        const config = globalConfigsService.getGlobalConfig();

        return {
          autoLoadModels: true,
          database: config.database.dbName,
          dialect: 'postgres' as const,
          host: config.database.dbHost,
          logging: config.database.dbLogging,
          password: config.database.dbPassword,
          port: config.database.dbPort,
          synchronize: false,
          username: config.database.dbUser,
        };
      },
    }),
    SequelizeModule.forFeature([User, Brand, ModelEntity, Product]),
  ],
  providers: [
    UserRepository,
    BrandRepository,
    ModelRepository,
    ProductRepository,
    {
      provide: UserModelToken,
      useValue: User,
    },
    {
      provide: UserRepositoryToken,
      useExisting: UserRepository,
    },
    {
      provide: BrandModelToken,
      useValue: Brand,
    },
    {
      provide: BrandRepositoryToken,
      useExisting: BrandRepository,
    },
    {
      provide: ModelEntityModelToken,
      useValue: ModelEntity,
    },
    {
      provide: ModelRepositoryToken,
      useExisting: ModelRepository,
    },
    {
      provide: ProductModelToken,
      useValue: Product,
    },
    {
      provide: ProductRepositoryToken,
      useExisting: ProductRepository,
    },
  ],
  exports: [
    UserRepository,
    BrandRepository,
    ModelRepository,
    ProductRepository,
    UserRepositoryToken,
    BrandRepositoryToken,
    ModelRepositoryToken,
    ProductRepositoryToken,
  ],
})
export class DatabaseModule {}
