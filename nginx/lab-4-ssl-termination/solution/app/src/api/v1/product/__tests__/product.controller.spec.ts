import { Test } from '@nestjs/testing';
import { productFixture } from '@/__tests__/fixtures/api/api.fixtures';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';

describe('ProductController', () => {
  let productController: ProductController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([productFixture]),
          },
        },
      ],
    }).compile();

    productController = moduleRef.get(ProductController);
  });

  it('should return products', async () => {
    await expect(productController.findAll()).resolves.toEqual([
      productFixture,
    ]);
  });
});
