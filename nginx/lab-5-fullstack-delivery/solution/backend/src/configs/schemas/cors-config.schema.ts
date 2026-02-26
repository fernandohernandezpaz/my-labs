import { IsBoolean, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CorsConfigSchema {
    @Transform(({ value }) => value === true || value === 'true' || value === '1')
    @IsBoolean()
    enabled: boolean = false;

    @IsString()
    origin: string = 'ALLOWED_ORIGINS';
}