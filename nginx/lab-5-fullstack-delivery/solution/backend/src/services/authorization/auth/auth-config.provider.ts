import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthConfigOptions } from './auth.config';

export const AuthConfigProvider: Provider = {
  provide: AuthConfigOptions,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    AuthConfigOptions.configure({
      basicAuthPassword:
        configService.get<string>('BASIC_AUTH_PASSWORD') ??
        process.env.BASIC_AUTH_PASSWORD,
      basicAuthUsername:
        configService.get<string>('BASIC_AUTH_USERNAME') ??
        process.env.BASIC_AUTH_USERNAME,
    }),
};
