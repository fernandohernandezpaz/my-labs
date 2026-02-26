import { Test } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Brand } from '@/database/models/brand.model';
import { ModelEntity } from '@/database/models/model.model';
import { Product } from '@/database/models/product.model';
import { User } from '@/database/models/user.model';
import { ProductRepository } from '@/database/repositories/product/product.repository';
import { repositoryTestConfig } from './fixtures/common.fixtures';

describe('ProductRepository', () => {
  let productRepository: ProductRepository;
  let sequelize: Sequelize;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          ...repositoryTestConfig,
          models: [User, Brand, ModelEntity, Product],
        }),
        SequelizeModule.forFeature([User, Brand, ModelEntity, Product]),
      ],
      providers: [ProductRepository],
    }).compile();

    productRepository = moduleRef.get(ProductRepository);
    sequelize = moduleRef.get(Sequelize);

    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create and find product', async () => {
    const user = await User.create({ password: 'admin123', username: 'admin' });
    const brand = await Brand.create({ createdBy: user.id, name: 'Toyota' });
    const model = await ModelEntity.create({
      brandId: brand.id,
      name: 'Corolla',
    });

    const created = await productRepository.create({
      modelId: model.id,
      name: 'Corolla XLE',
      price: 23000,
      stock: 4,
    });

    const found = await productRepository.findOneById(created.id);

    expect(found).toBeTruthy();
    expect(found?.name).toBe('Corolla XLE');
  });
});
