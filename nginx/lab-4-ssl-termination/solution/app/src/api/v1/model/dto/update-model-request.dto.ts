import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateModelRequestDto {
  @ApiPropertyOptional({ example: 'Sentra' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @ApiPropertyOptional({ example: 'b6d5cf3d-60ca-4b65-b9f4-8e7ba3f54841' })
  @IsOptional()
  @IsUUID()
  brandId?: string;
}
