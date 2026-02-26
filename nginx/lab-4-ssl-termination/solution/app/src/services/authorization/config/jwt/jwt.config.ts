import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { JwtConfigSchema } from './schema/jwt-config.schema';
import { Environment } from '@/configs/enums/environment.enum';

export class JwtConfigOptions {
  JWT_EXPIRES_IN!: string;
  JWT_SECRET!: string;

  static getDefaults(): Partial<JwtConfigOptions> {
    if (process.env.NODE_ENV === Environment.Test) {
      return {
        JWT_EXPIRES_IN: '10m',
        JWT_SECRET: 'secret',
      };
    }

    return {
      JWT_EXPIRES_IN: '15m',
      JWT_SECRET: 'dev-secret-123',
    };
  }

  static configure(overrides?: {
    jwtExpiresIn?: string;
    jwtSecret?: string;
  }): JwtConfigOptions {
    const defaults = JwtConfigOptions.getDefaults();
    const schema = plainToInstance(JwtConfigSchema, {
      jwtExpiresIn:
        overrides?.jwtExpiresIn ??
        process.env.JWT_EXPIRES_IN ??
        defaults.JWT_EXPIRES_IN,
      jwtSecret:
        overrides?.jwtSecret ?? process.env.JWT_SECRET ?? defaults.JWT_SECRET,
    });

    const errors = validateSync(schema, { skipMissingProperties: false });

    if (errors.length > 0) {
      const messages = errors
        .map((error) => Object.values(error.constraints ?? {}).join(', '))
        .filter(Boolean)
        .join('; ');
      throw new Error(`Invalid JWT Config: ${messages}`);
    }

    return {
      JWT_EXPIRES_IN: schema.jwtExpiresIn,
      JWT_SECRET: schema.jwtSecret,
    };
  }
}
