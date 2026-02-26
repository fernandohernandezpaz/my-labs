import { Test } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from '@/database/models/user.model';
import { UserRepository } from '@/database/repositories/user/user.repository';
import { repositoryTestConfig } from './fixtures/common.fixtures';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let sequelize: Sequelize;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({ ...repositoryTestConfig, models: [User] }),
        SequelizeModule.forFeature([User]),
      ],
      providers: [UserRepository],
    }).compile();

    userRepository = moduleRef.get(UserRepository);
    sequelize = moduleRef.get(Sequelize);

    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create and find user by username', async () => {
    const created = await userRepository.create({
      password: 'admin123',
      username: 'admin',
    });

    const found = await userRepository.findOneByUsername(created.username);

    expect(found).toBeTruthy();
    expect(found?.id).toBe(created.id);
  });
});
