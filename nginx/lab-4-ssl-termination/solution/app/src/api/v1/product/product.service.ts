import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from '@/database/repositories';
import { CreateProductRequestDto } from './dto/create-product-request.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { UpdateProductRequestDto } from './dto/update-product-request.dto';
import { mapProductToResponseDto } from './mapper/product.mapper';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAll(): Promise<ProductResponseDto[]> {
    const products = await this.productRepository.findAll();
    return products.map(mapProductToResponseDto);
  }

  async findById(id: string): Promise<ProductResponseDto> {
    const product = await this.productRepository.findOneById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return mapProductToResponseDto(product);
  }

  async create(
    createProductRequestDto: CreateProductRequestDto,
  ): Promise<ProductResponseDto> {
    const { name } = createProductRequestDto;

    const productRegistered = await this.productRepository.existsBy({
      where: {
        name: name,
      },
    });

    if (productRegistered) {
      throw new BadRequestException(
        `The product with name ${name} already exists`,
      );
    }

    return await this.productRepository.transaction(async (transaction) => {
      const product = await this.productRepository.create(
        createProductRequestDto,
        transaction,
      );
      return mapProductToResponseDto(product);
    });
  }

  update(
    id: string,
    updateProductRequestDto: UpdateProductRequestDto,
  ): Promise<ProductResponseDto> {
    return this.productRepository.transaction(async (transaction) => {
      const product = await this.productRepository.findOneById(id, transaction);
      if (!product) {
        throw new NotFoundException('Product not found');
      }

      await this.productRepository.updateOne(
        id,
        updateProductRequestDto as any,
        transaction,
      );
      const updatedProduct = await this.productRepository.findOneById(
        id,
        transaction,
      );

      if (!updatedProduct) {
        throw new NotFoundException('Product not found');
      }

      return mapProductToResponseDto(updatedProduct);
    });
  }

  delete(id: string): Promise<void> {
    return this.productRepository.transaction(async (transaction) => {
      const product = await this.productRepository.findOneById(id, transaction);
      if (!product) {
        throw new NotFoundException('Product not found');
      }

      await this.productRepository.deleteBy({ id }, transaction);
    });
  }
}
