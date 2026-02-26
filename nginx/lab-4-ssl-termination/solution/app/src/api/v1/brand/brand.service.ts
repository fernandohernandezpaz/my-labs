import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BrandRepository } from '@/database/repositories';
import { BrandResponseDto } from './dto/brand-response.dto';
import { CreateBrandRequestDto } from './dto/create-brand-request.dto';
import { UpdateBrandRequestDto } from './dto/update-brand-request.dto';
import { mapBrandToResponseDto } from './mapper/brand.mapper';
import { RequestingUser } from '@/common/types/request-user.type';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) { }

  async findAll(): Promise<BrandResponseDto[]> {
    const brands = await this.brandRepository.findAll();
    return brands.map(mapBrandToResponseDto);
  }

  async findById(id: string): Promise<BrandResponseDto> {
    const brand = await this.brandRepository.findOneById(id);

    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    return mapBrandToResponseDto(brand);
  }

  async create(
    createBrandRequestDto: CreateBrandRequestDto,
    user: RequestingUser,
  ): Promise<BrandResponseDto> {
    const { name } = createBrandRequestDto;

    const brandRegistered = await this.brandRepository.existsBy({
      name,
    });

    if (brandRegistered) {
      throw new BadRequestException(`Brand with name ${name} already exists`);
    }

    return await this.brandRepository.transaction(async (transaction) => {
      const brand = await this.brandRepository.create(
        {
          createdBy: user.userId,
          name,
        },
        transaction,
      );

      return mapBrandToResponseDto(brand);
    });
  }

  update(
    id: string,
    updateBrandRequestDto: UpdateBrandRequestDto,
  ): Promise<BrandResponseDto> {
    return this.brandRepository.transaction(async (transaction) => {
      const brand = await this.brandRepository.findOneById(id, transaction);
      if (!brand) {
        throw new NotFoundException('Brand not found');
      }

      await this.brandRepository.updateOne(
        id,
        updateBrandRequestDto as any,
        transaction,
      );
      const updatedBrand = await this.brandRepository.findOneById(
        id,
        transaction,
      );

      if (!updatedBrand) {
        throw new NotFoundException('Brand not found');
      }

      return mapBrandToResponseDto(updatedBrand);
    });
  }

  delete(id: string): Promise<void> {
    return this.brandRepository.transaction(async (transaction) => {
      const brand = await this.brandRepository.findOneById(id, transaction);
      if (!brand) {
        throw new NotFoundException('Brand not found');
      }

      await this.brandRepository.deleteBy({ id }, transaction);
    });
  }
}
