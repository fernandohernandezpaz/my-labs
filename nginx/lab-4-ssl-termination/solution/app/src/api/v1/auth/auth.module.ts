import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthorizationModule } from '@/services/authorization/authorization.module';
import { LoggerModule } from '@/services/logger/logger.module';

@Module({
  controllers: [AuthController],
  imports: [DatabaseModule, AuthorizationModule, LoggerModule],
  providers: [AuthService],
})
export class AuthModule {}
