import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { GlobalConfigSchema } from '../schemas/global-config.schema';

export const validateGlobalConfigs = (
  env: Record<string, unknown>,
): Record<string, unknown> => {
  const normalized = {
    cors: {
      enabled: env.CORS_ENABLED,
      origin: env.CORS_ORIGIN ?? env.CORS_ALLOWED_ORIGINS,
    },
    dbHost: env.DB_HOST ?? env.DATABASE_HOST,
    dbLogging: env.DB_LOGGING,
    dbName: env.DB_NAME ?? env.DATABASE_NAME,
    dbPassword: env.DB_PASSWORD ?? env.DATABASE_PASSWORD,
    dbPort: env.DB_PORT ?? env.DATABASE_PORT,
    dbUser: env.DB_USER ?? env.DATABASE_USERNAME,
    jwtExpiresIn: env.JWT_EXPIRES_IN,
    jwtSecret: env.JWT_SECRET,
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
  };

  const validatedConfig = plainToInstance(GlobalConfigSchema, normalized, {
    enableImplicitConversion: true,
  });

  const validationErrors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (validationErrors.length > 0) {
    const messages = validationErrors
      .map((error) => Object.values(error.constraints ?? {}).join(', '))
      .filter(Boolean)
      .join('; ');

    throw new Error(`Config validation failed: ${messages}`);
  }

  return {
    ...env,
    BASIC_AUTH_PASSWORD: env.BASIC_AUTH_PASSWORD,
    BASIC_AUTH_USERNAME: env.BASIC_AUTH_USERNAME,
    CORS_ENABLED: validatedConfig.cors.enabled,
    CORS_ORIGIN: validatedConfig.cors.origin,
    DATABASE_HOST: validatedConfig.dbHost,
    DATABASE_NAME: validatedConfig.dbName,
    DATABASE_PASSWORD: validatedConfig.dbPassword,
    DATABASE_PORT: validatedConfig.dbPort,
    DATABASE_USERNAME: validatedConfig.dbUser,
    DB_HOST: validatedConfig.dbHost,
    DB_LOGGING: validatedConfig.dbLogging,
    DB_NAME: validatedConfig.dbName,
    DB_PASSWORD: validatedConfig.dbPassword,
    DB_PORT: validatedConfig.dbPort,
    DB_USER: validatedConfig.dbUser,
    JWT_EXPIRES_IN: validatedConfig.jwtExpiresIn,
    JWT_SECRET: validatedConfig.jwtSecret,
    NODE_ENV: validatedConfig.nodeEnv,
    PORT: validatedConfig.port,
  };
};
