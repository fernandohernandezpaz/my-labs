import { Test } from '@nestjs/testing';
import { modelFixture } from '@/__tests__/fixtures/api/api.fixtures';
import { modelRepositoryProviderMock } from '@/__tests__/providers/repository.providers';
import { ModelRepository } from '@/database/repositories';
import { ModelService } from '../model.service';

describe('ModelService', () => {
  let modelService: ModelService;
  let modelRepository: ModelRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ModelService,
        {
          provide: ModelRepository,
          useValue: modelRepositoryProviderMock,
        },
      ],
    }).compile();

    modelService = moduleRef.get(ModelService);
    modelRepository = moduleRef.get(ModelRepository);
  });

  it('should return model list', async () => {
    jest
      .spyOn(modelRepository, 'findAll')
      .mockResolvedValue([modelFixture] as any);

    await expect(modelService.findAll()).resolves.toEqual([modelFixture]);
  });
});
