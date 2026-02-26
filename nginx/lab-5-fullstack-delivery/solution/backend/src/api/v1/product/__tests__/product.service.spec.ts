import { Test } from '@nestjs/testing';
import { productFixture } from '@/__tests__/fixtures/api/api.fixtures';
import { productRepositoryProviderMock } from '@/__tests__/providers/repository.providers';
import { ProductRepository } from '@/database/repositories';
import { ProductService } from '../product.service';

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: ProductRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: productRepositoryProviderMock,
        },
      ],
    }).compile();

    productService = moduleRef.get(ProductService);
    productRepository = moduleRef.get(ProductRepository);
  });

  it('should return product list', async () => {
    jest
      .spyOn(productRepository, 'findAll')
      .mockResolvedValue([productFixture] as any);

    await expect(productService.findAll()).resolves.toEqual([productFixture]);
  });
});
