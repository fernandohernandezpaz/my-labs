import { Test } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Brand } from '@/database/models/brand.model';
import { ModelEntity } from '@/database/models/model.model';
import { User } from '@/database/models/user.model';
import { ModelRepository } from '@/database/repositories/model/model.repository';
import { repositoryTestConfig } from './fixtures/common.fixtures';

describe('ModelRepository', () => {
  let modelRepository: ModelRepository;
  let sequelize: Sequelize;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          ...repositoryTestConfig,
          models: [User, Brand, ModelEntity],
        }),
        SequelizeModule.forFeature([User, Brand, ModelEntity]),
      ],
      providers: [ModelRepository],
    }).compile();

    modelRepository = moduleRef.get(ModelRepository);
    sequelize = moduleRef.get(Sequelize);

    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create and find model', async () => {
    const user = await User.create({ password: 'admin123', username: 'admin' });
    const brand = await Brand.create({ createdBy: user.id, name: 'Toyota' });

    const created = await modelRepository.create({
      brandId: brand.id,
      name: 'Corolla',
    });

    const found = await modelRepository.findOneById(created.id);

    expect(found).toBeTruthy();
    expect(found?.name).toBe('Corolla');
  });
});
