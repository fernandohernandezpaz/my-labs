import { Environment } from '../enums/environment.enum';
import { CorsConfigOptions } from './cors-config-options.interface';
import { DatabaseConfigOptions } from './database-config-options.interface';

export interface GlobalConfigOptions {
  appName: string;
  cors: CorsConfigOptions;
  database: DatabaseConfigOptions;
  jwtExpiresIn: string;
  jwtSecret: string;
  nodeEnv: Environment;
  port: number;
}
