import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'eaG5quVyYmJVb+c7AuUxvAxjRcc1W3nUVQ1q1Ffpx7Y=',
    });
  }

  async validate(payload: Record<string, any>) {
    return {
      userId: payload?.sub ?? '',
      username: payload?.username ?? '',
      permissions: payload?.permissions ?? [],
    };
  }
}
