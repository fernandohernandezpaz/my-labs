import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { authFixture } from '@/__tests__/fixtures/api/api.fixtures';
import { userRepositoryProviderMock } from '@/__tests__/providers/repository.providers';
import { UserRepository } from '@/database/repositories';
import { AccessTokenService } from '@/services/authorization/access-token.service';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useValue: userRepositoryProviderMock,
        },
        {
          provide: AccessTokenService,
          useValue: {
            sign: jest.fn().mockResolvedValue('jwt-token'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should login successfully', async () => {
    jest.spyOn(userRepository, 'findOneByUsername').mockResolvedValue({
      id: authFixture.userId,
      password: authFixture.password,
      username: authFixture.username,
    } as any);

    await expect(
      authService.login({
        password: authFixture.password,
        username: authFixture.username,
      }),
    ).resolves.toEqual({ accessToken: 'jwt-token' });
  });

  it('should throw UnauthorizedException when credentials are invalid', async () => {
    jest
      .spyOn(userRepository, 'findOneByUsername')
      .mockResolvedValue(null as any);

    await expect(
      authService.login({ password: 'wrong-pass', username: 'wrong-user' }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
