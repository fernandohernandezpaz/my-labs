import { Brand } from '@/database/models/brand.model';
import { BrandResponseDto } from '../dto/brand-response.dto';

export function mapBrandToResponseDto(brand: Brand): BrandResponseDto {
  return {
    id: brand.id,
    name: brand.name,
    createdBy: brand.createdBy,
    createdAt: brand.createdAt,
    updatedAt: brand.updatedAt,
  };
}
