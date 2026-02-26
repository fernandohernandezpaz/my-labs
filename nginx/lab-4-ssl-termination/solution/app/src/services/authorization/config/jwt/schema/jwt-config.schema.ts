import { IsNotEmpty, IsString } from 'class-validator';

export class JwtConfigSchema {
  @IsString()
  @IsNotEmpty()
  jwtExpiresIn!: string;

  @IsString()
  @IsNotEmpty()
  jwtSecret!: string;
}
