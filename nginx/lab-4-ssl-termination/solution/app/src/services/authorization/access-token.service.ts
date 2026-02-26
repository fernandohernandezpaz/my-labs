import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '@/services/logger/logger.service';
import { RequestingUser } from '@/common/types/request-user.type';
import { JwtConfigOptions } from './config/jwt/jwt.config';
import { AccessTokenPayload } from './types/access-token-payload.type';

@Injectable()
export class AccessTokenService {
  constructor(
    private readonly jwtConfig: JwtConfigOptions,
    private readonly jwtService: JwtService,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext(AccessTokenService.name);
  }

  generateToken(payload: AccessTokenPayload): string {
    return this.jwtService.sign<AccessTokenPayload>(payload, {
      expiresIn: this.jwtConfig.JWT_EXPIRES_IN as any,
      secret: this.jwtConfig.JWT_SECRET,
    });
  }

  sign(payload: AccessTokenPayload): Promise<string> {
    return Promise.resolve(this.generateToken(payload));
  }

  verifyToken(token: string, secret?: string): RequestingUser {
    try {
      return this.jwtService.verify<RequestingUser>(token, {
        secret: secret ?? this.jwtConfig.JWT_SECRET,
      });
    } catch (error) {
      this.loggerService.error(
        'Error while verifying JWT token',
        error instanceof Error ? error : undefined,
      );
      throw new UnauthorizedException('Access token is invalid or has expired');
    }
  }
}
