import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateModelRequestDto {
  @ApiProperty({ example: 'Corolla' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name!: string;

  @ApiProperty({ example: 'b6d5cf3d-60ca-4b65-b9f4-8e7ba3f54841' })
  @IsUUID()
  brandId!: string;
}
