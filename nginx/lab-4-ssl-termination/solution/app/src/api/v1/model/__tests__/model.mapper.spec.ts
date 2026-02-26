import { modelFixture } from '@/__tests__/fixtures/api/api.fixtures';
import { mapModelToResponseDto } from '../mapper/model.mapper';

describe('model mapper', () => {
  it('maps model entity to response dto', () => {
    expect(mapModelToResponseDto(modelFixture as any)).toEqual(modelFixture);
  });
});
