import { Environment } from '../enums/environment.enum';
import { DatabaseConfigOptions } from './database-config-options.interface';

export interface GlobalConfigOptions {
  appName: string;
  database: DatabaseConfigOptions;
  jwtExpiresIn: string;
  jwtSecret: string;
  nodeEnv: Environment;
  port: number;
}
