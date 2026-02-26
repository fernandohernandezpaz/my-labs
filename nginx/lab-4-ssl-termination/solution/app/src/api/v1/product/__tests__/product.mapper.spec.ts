import { productFixture } from '@/__tests__/fixtures/api/api.fixtures';
import { mapProductToResponseDto } from '../mapper/product.mapper';

describe('product mapper', () => {
  it('maps product entity to response dto', () => {
    expect(mapProductToResponseDto(productFixture as any)).toEqual(
      productFixture,
    );
  });
});
