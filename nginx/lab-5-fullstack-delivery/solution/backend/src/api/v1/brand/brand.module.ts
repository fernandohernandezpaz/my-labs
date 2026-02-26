import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { LoggerModule } from '@/services/logger/logger.module';
import { AuthorizationModule } from '@/services/authorization/authorization.module';
import { JwtAuthGuard } from '@/services/authorization/guards/jwt-auth.guard';
import { JwtConfigProvider } from '@/services/authorization/config/jwt/jwt-config.provider';

@Module({
  controllers: [BrandController],
  imports: [DatabaseModule, LoggerModule, AuthorizationModule],
  providers: [BrandService, JwtAuthGuard, JwtConfigProvider],
})
export class BrandModule {}
