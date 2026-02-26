import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { RequestingUser } from '@/common/types/request-user.type';
import { AccessTokenService } from '../access-token.service';
import { JwtConfigOptions } from '../config/jwt/jwt.config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtConfig: JwtConfigOptions,
    private readonly accessTokenService: AccessTokenService,
    private readonly reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();

    const token = this.extractToken(request);
    const accessSecret = this.jwtConfig.JWT_SECRET;

    try {
      const decoded: any = this.accessTokenService.verifyToken(token, accessSecret);

      // Map JWT 'sub' to 'userId' as expected by the rest of the app
      request.user = {
        userId: decoded.sub,
        username: decoded.username,
        email: decoded.email,
      };

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired JWT token');
    }
  }

  private extractToken(request: Request): string {
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization header with Bearer token is required',
      );
    }

    return authHeader.replace('Bearer ', '').trim();
  }
}
