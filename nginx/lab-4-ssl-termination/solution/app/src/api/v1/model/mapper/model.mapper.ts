import { ModelEntity } from '@/database/models/model.model';
import { ModelResponseDto } from '../dto/model-response.dto';

export function mapModelToResponseDto(model: ModelEntity): ModelResponseDto {
  return {
    id: model.id,
    name: model.name,
    brandId: model.brandId,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
}
