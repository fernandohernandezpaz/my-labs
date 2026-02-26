import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  InvalidCredentials,
  NoAuthorizationHeaderFound,
} from '../constants/auth.constants';
import { AuthConfigOptions } from '../auth/auth.config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authConfig: AuthConfigOptions) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new UnauthorizedException(NoAuthorizationHeaderFound);
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'ascii',
    );
    const [username, password] = credentials.split(':');

    if (
      !(
        username === this.authConfig.USERNAME &&
        password === this.authConfig.PASSWORD
      )
    ) {
      throw new UnauthorizedException(InvalidCredentials);
    }

    return true;
  }
}
