import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { Environment } from '../enums/environment.enum';

export class GlobalConfigSchema {
  @IsEnum(Environment)
  @IsOptional()
  nodeEnv: Environment = Environment.Development;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(65535)
  @IsOptional()
  port = 3000;

  @IsString()
  @MinLength(8)
  @IsOptional()
  jwtSecret = 'dev-secret-123';

  @IsString()
  @IsOptional()
  jwtExpiresIn = '1h';

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  dbHost = 'localhost';

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(65535)
  @IsOptional()
  dbPort = 5432;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  dbName = 'products_db';

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  dbUser = 'postgres';

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  dbPassword = 'postgres';

  @Transform(({ value }) => value === true || value === 'true')
  @IsOptional()
  dbLogging = false;
}
