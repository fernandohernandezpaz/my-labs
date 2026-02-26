import { Test } from '@nestjs/testing';
import { brandFixture } from '@/__tests__/fixtures/api/api.fixtures';
import { BrandController } from '../brand.controller';
import { BrandService } from '../brand.service';

describe('BrandController', () => {
  let brandController: BrandController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BrandController],
      providers: [
        {
          provide: BrandService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([brandFixture]),
          },
        },
      ],
    }).compile();

    brandController = moduleRef.get(BrandController);
  });

  it('should return brands', async () => {
    await expect(brandController.findAll()).resolves.toEqual([brandFixture]);
  });
});
