import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/services/authorization/guards/jwt-auth.guard';
import { CreateProductRequestDto } from './dto/create-product-request.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { UpdateProductRequestDto } from './dto/update-product-request.dto';
import { ProductService } from './product.service';

@ApiTags('Product')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'product', version: '1' })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOkResponse({ type: ProductResponseDto, isArray: true })
  findAll(): Promise<ProductResponseDto[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: ProductResponseDto })
  findById(@Param('id') id: string): Promise<ProductResponseDto> {
    return this.productService.findById(id);
  }

  @Post()
  @ApiBody({ type: CreateProductRequestDto })
  @ApiOkResponse({ type: ProductResponseDto })
  create(
    @Body() createProductRequestDto: CreateProductRequestDto,
  ): Promise<ProductResponseDto> {
    return this.productService.create(createProductRequestDto);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateProductRequestDto })
  @ApiOkResponse({ type: ProductResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateProductRequestDto: UpdateProductRequestDto,
  ): Promise<ProductResponseDto> {
    return this.productService.update(id, updateProductRequestDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiNoContentResponse({ description: 'Product deleted successfully' })
  delete(@Param('id') id: string): Promise<void> {
    return this.productService.delete(id);
  }
}
