import { ApiProperty } from '@nestjs/swagger';

export class BrandResponseDto {
  @ApiProperty({ example: 'b6d5cf3d-60ca-4b65-b9f4-8e7ba3f54841' })
  id!: string;

  @ApiProperty({ example: 'Toyota' })
  name!: string;

  @ApiProperty({ example: '5f53b853-1e59-49af-a899-b35f91135f5c' })
  createdBy!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
