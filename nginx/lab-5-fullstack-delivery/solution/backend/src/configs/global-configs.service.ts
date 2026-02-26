import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from './enums/environment.enum';
import { GlobalConfigOptions } from './global-configs';

@Injectable()
export class GlobalConfigsService {
  constructor(private readonly configService: ConfigService) { }

  getGlobalConfig(): GlobalConfigOptions {
    return {
      appName: 'exercive',
      cors: {
        enabled: this.configService.get<boolean>('CORS_ENABLED', false),
        origin: this.configService.get<string>('CORS_ORIGIN', 'ALLOWED_ORIGINS'),
      },
      database: {
        dbHost: this.configService.get<string>('DB_HOST', 'localhost'),
        dbLogging: this.configService.get<boolean>('DB_LOGGING', false),
        dbName: this.configService.get<string>('DB_NAME', 'products_db'),
        dbPassword: this.configService.get<string>('DB_PASSWORD', 'postgres'),
        dbPort: this.configService.get<number>('DB_PORT', 5432),
        dbUser: this.configService.get<string>('DB_USER', 'postgres'),
      },
      jwtExpiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '1h'),
      jwtSecret: this.configService.get<string>('JWT_SECRET', 'dev-secret-123'),
      nodeEnv: this.configService.get<Environment>(
        'NODE_ENV',
        Environment.Development,
      ),
      port: this.configService.get<number>('PORT', 3000),
    };
  }
}
