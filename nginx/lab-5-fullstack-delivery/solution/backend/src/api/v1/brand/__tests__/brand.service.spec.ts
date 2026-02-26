import { Test } from '@nestjs/testing';
import { brandFixture } from '@/__tests__/fixtures/api/api.fixtures';
import { brandRepositoryProviderMock } from '@/__tests__/providers/repository.providers';
import { BrandRepository } from '@/database/repositories';
import { BrandService } from '../brand.service';

describe('BrandService', () => {
  let brandService: BrandService;
  let brandRepository: BrandRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        BrandService,
        {
          provide: BrandRepository,
          useValue: brandRepositoryProviderMock,
        },
      ],
    }).compile();

    brandService = moduleRef.get(BrandService);
    brandRepository = moduleRef.get(BrandRepository);
  });

  it('should return brand list', async () => {
    jest
      .spyOn(brandRepository, 'findAll')
      .mockResolvedValue([brandFixture] as any);

    await expect(brandService.findAll()).resolves.toEqual([brandFixture]);
  });
});
