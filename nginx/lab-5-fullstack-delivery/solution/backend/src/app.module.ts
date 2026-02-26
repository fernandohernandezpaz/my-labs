import { Module } from '@nestjs/common';
import { GlobalConfigsModule } from './configs/global-configs.module';
import { LoggerModule } from './services/logger/logger.module';
import { DatabaseModule } from './database/database.module';
import { AuthorizationModule } from './services/authorization/authorization.module';
import { AuthModule } from './api/v1/auth/auth.module';
import { BrandModule } from './api/v1/brand/brand.module';
import { ModelModule } from './api/v1/model/model.module';
import { ProductModule } from './api/v1/product/product.module';

@Module({
  imports: [
    GlobalConfigsModule,
    LoggerModule,
    DatabaseModule,
    AuthorizationModule,
    AuthModule,
    BrandModule,
    ModelModule,
    ProductModule,
  ],
})
export class AppModule {}
