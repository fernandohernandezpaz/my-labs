import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';
import { Environment } from '@/configs/enums/environment.enum';

class AuthConfigSchema {
  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  username!: string;
}

export class AuthConfigOptions {
  PASSWORD!: string;
  USERNAME!: string;

  static getDefaults(): Partial<AuthConfigOptions> {
    if (process.env.NODE_ENV === Environment.Test) {
      return {
        PASSWORD: 'test',
        USERNAME: 'test_username',
      };
    }

    return {};
  }

  static configure(overrides?: {
    basicAuthPassword?: string;
    basicAuthUsername?: string;
  }): AuthConfigOptions {
    const defaults = AuthConfigOptions.getDefaults();
    const schema = plainToInstance(AuthConfigSchema, {
      password:
        overrides?.basicAuthPassword ??
        process.env.BASIC_AUTH_PASSWORD ??
        defaults.PASSWORD,
      username:
        overrides?.basicAuthUsername ??
        process.env.BASIC_AUTH_USERNAME ??
        defaults.USERNAME,
    });

    const errors = validateSync(schema, { skipMissingProperties: false });

    if (errors.length > 0) {
      const messages = errors
        .map((error) => Object.values(error.constraints ?? {}).join(', '))
        .filter(Boolean)
        .join('; ');
      throw new Error(`Invalid Auth Config: ${messages}`);
    }

    return {
      PASSWORD: schema.password,
      USERNAME: schema.username,
    };
  }
}
