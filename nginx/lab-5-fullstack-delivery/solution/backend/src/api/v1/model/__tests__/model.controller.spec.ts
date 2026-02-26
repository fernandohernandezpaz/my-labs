import { Test } from '@nestjs/testing';
import { modelFixture } from '@/__tests__/fixtures/api/api.fixtures';
import { ModelController } from '../model.controller';
import { ModelService } from '../model.service';

describe('ModelController', () => {
  let modelController: ModelController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ModelController],
      providers: [
        {
          provide: ModelService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([modelFixture]),
          },
        },
      ],
    }).compile();

    modelController = moduleRef.get(ModelController);
  });

  it('should return models', async () => {
    await expect(modelController.findAll()).resolves.toEqual([modelFixture]);
  });
});
