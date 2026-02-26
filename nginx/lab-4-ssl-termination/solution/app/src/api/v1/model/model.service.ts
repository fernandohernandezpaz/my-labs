import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ModelRepository } from '@/database/repositories';
import { CreateModelRequestDto } from './dto/create-model-request.dto';
import { ModelResponseDto } from './dto/model-response.dto';
import { UpdateModelRequestDto } from './dto/update-model-request.dto';
import { mapModelToResponseDto } from './mapper/model.mapper';

@Injectable()
export class ModelService {
  constructor(private readonly modelRepository: ModelRepository) {}

  async findAll(): Promise<ModelResponseDto[]> {
    const models = await this.modelRepository.findAll();
    return models.map(mapModelToResponseDto);
  }

  async findById(id: string): Promise<ModelResponseDto> {
    const model = await this.modelRepository.findOneById(id);

    if (!model) {
      throw new NotFoundException('Model not found');
    }

    return mapModelToResponseDto(model);
  }

  async create(
    createModelRequestDto: CreateModelRequestDto,
  ): Promise<ModelResponseDto> {
    const { name } = createModelRequestDto;

    const modelRegistered = await this.modelRepository.existsBy({
      where: {
        name,
      },
    });

    if (modelRegistered) {
      throw new BadRequestException(
        `The model with name ${name} already exists`,
      );
    }

    return this.modelRepository.transaction(async (transaction) => {
      const model = await this.modelRepository.create(
        createModelRequestDto,
        transaction,
      );
      return mapModelToResponseDto(model);
    });
  }

  update(
    id: string,
    updateModelRequestDto: UpdateModelRequestDto,
  ): Promise<ModelResponseDto> {
    return this.modelRepository.transaction(async (transaction) => {
      const model = await this.modelRepository.findOneById(id, transaction);
      if (!model) {
        throw new NotFoundException('Model not found');
      }

      await this.modelRepository.updateOne(
        id,
        updateModelRequestDto,
        transaction,
      );
      const updatedModel = await this.modelRepository.findOneById(
        id,
        transaction,
      );

      if (!updatedModel) {
        throw new NotFoundException('Model not found');
      }

      return mapModelToResponseDto(updatedModel);
    });
  }

  delete(id: string): Promise<void> {
    return this.modelRepository.transaction(async (transaction) => {
      const model = await this.modelRepository.findOneById(id, transaction);
      if (!model) {
        throw new NotFoundException('Model not found');
      }

      await this.modelRepository.deleteBy({ id }, transaction);
    });
  }
}
