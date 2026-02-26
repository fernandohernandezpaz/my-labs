import { Product } from '@/database/models/product.model';
import { ProductResponseDto } from '../dto/product-response.dto';

export function mapProductToResponseDto(product: Product): ProductResponseDto {
  return {
    id: product.id,
    name: product.name,
    price: Number(product.price),
    stock: product.stock,
    modelId: product.modelId,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}
