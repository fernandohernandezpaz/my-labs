import { brandFixture } from '@/__tests__/fixtures/api/api.fixtures';
import { mapBrandToResponseDto } from '../mapper/brand.mapper';

describe('brand mapper', () => {
  it('maps brand model to response dto', () => {
    expect(mapBrandToResponseDto(brandFixture as any)).toEqual(brandFixture);
  });
});
