import { ApiProperty } from '@nestjs/swagger';

export class ModelResponseDto {
  @ApiProperty({ example: '77f8a3ff-5546-49dc-9322-a3752a71873a' })
  id!: string;

  @ApiProperty({ example: 'Corolla' })
  name!: string;

  @ApiProperty({ example: 'b6d5cf3d-60ca-4b65-b9f4-8e7ba3f54841' })
  brandId!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
