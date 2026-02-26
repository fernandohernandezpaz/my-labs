import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({ example: '1fd4bc3b-20e1-40f8-ae3d-bcc89acc13e9' })
  id!: string;

  @ApiProperty({ example: 'Corolla XLE' })
  name!: string;

  @ApiProperty({ example: 23000 })
  price!: number;

  @ApiProperty({ example: 3 })
  stock!: number;

  @ApiProperty({ example: '77f8a3ff-5546-49dc-9322-a3752a71873a' })
  modelId!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
