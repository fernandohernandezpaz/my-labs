import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBrandRequestDto {
  @ApiPropertyOptional({ example: 'Nissan' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;
}
