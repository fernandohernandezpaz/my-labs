import { GlobalConfigSchema } from './schemas/global-config.schema';
import { validateGlobalConfigs } from './validators/global-configs.validator';
import { DatabaseConfigOptions } from './interfaces/database-config-options.interface';
import { GlobalConfigOptions } from './interfaces/global-config-options.interface';

export {
  DatabaseConfigOptions,
  GlobalConfigOptions,
  GlobalConfigSchema,
  validateGlobalConfigs,
};
