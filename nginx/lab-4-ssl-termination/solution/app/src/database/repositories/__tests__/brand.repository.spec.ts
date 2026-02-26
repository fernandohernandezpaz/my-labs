import { Test } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Brand } from '@/database/models/brand.model';
import { User } from '@/database/models/user.model';
import { BrandRepository } from '@/database/repositories/brand/brand.repository';
import { repositoryTestConfig } from './fixtures/common.fixtures';

describe('BrandRepository', () => {
  let brandRepository: BrandRepository;
  let sequelize: Sequelize;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          ...repositoryTestConfig,
          models: [User, Brand],
        }),
        SequelizeModule.forFeature([User, Brand]),
      ],
      providers: [BrandRepository],
    }).compile();

    brandRepository = moduleRef.get(BrandRepository);
    sequelize = moduleRef.get(Sequelize);

    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create and find brand', async () => {
    const user = await User.create({ password: 'admin123', username: 'admin' });
    const created = await brandRepository.create({
      createdBy: user.id,
      name: 'Mazda',
    });

    const found = await brandRepository.findOneById(created.id);

    expect(found).toBeTruthy();
    expect(found?.name).toBe('Mazda');
  });
});
