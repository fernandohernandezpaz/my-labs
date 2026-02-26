import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '@/database/database.module';
import { LoggerModule } from '@/services/logger/logger.module';
import { AccessTokenService } from './access-token.service';
import { AuthConfigProvider } from './auth/auth-config.provider';
import { JwtConfigProvider } from './config/jwt/jwt-config.provider';

@Module({
  exports: [AccessTokenService],
  imports: [DatabaseModule, PassportModule, JwtModule, LoggerModule],
  providers: [AuthConfigProvider, JwtConfigProvider, AccessTokenService],
})
export class AuthorizationModule {}
