import { GlobalConfigSchema } from './schemas/global-config.schema';
import { validateGlobalConfigs } from './validators/global-configs.validator';
import { DatabaseConfigOptions } from './interfaces/database-config-options.interface';
import { GlobalConfigOptions } from './interfaces/global-config-options.interface';
import { CorsConfigOptions } from './interfaces/cors-config-options.interface';

export {
  CorsConfigOptions,
  DatabaseConfigOptions,
  GlobalConfigOptions,
  GlobalConfigSchema,
  validateGlobalConfigs,
};
