import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { LoggerModule } from '@/services/logger/logger.module';
import { AuthorizationModule } from '@/services/authorization/authorization.module';
import { JwtConfigProvider } from '@/services/authorization/config/jwt/jwt-config.provider';
import { JwtAuthGuard } from '@/services/authorization/guards/jwt-auth.guard';

@Module({
  controllers: [ProductController],
  imports: [DatabaseModule, LoggerModule, AuthorizationModule],
  providers: [ProductService, JwtConfigProvider, JwtAuthGuard],
})
export class ProductModule {}
