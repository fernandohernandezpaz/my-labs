import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { ModelController } from './model.controller';
import { ModelService } from './model.service';
import { LoggerModule } from '@/services/logger/logger.module';
import { AuthorizationModule } from '@/services/authorization/authorization.module';
import { JwtAuthGuard } from '@/services/authorization/guards/jwt-auth.guard';
import { JwtConfigProvider } from '@/services/authorization/config/jwt/jwt-config.provider';

@Module({
  controllers: [ModelController],
  imports: [DatabaseModule, LoggerModule, AuthorizationModule],
  providers: [ModelService, JwtAuthGuard, JwtConfigProvider],
})
export class ModelModule {}
