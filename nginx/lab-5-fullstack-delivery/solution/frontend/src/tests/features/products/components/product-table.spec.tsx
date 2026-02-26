import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductTable } from '@/features/products/components/product-table';

describe('ProductTable', () => {
  it('renders mapped model name and formatted price', () => {
    render(
      <ProductTable
        data={[
          {
            createdAt: '2026-01-01T00:00:00.000Z',
            id: 'product-1',
            modelId: 'model-1',
            name: 'Corolla XLE',
            price: 23000,
            stock: 5,
            updatedAt: '2026-01-01T00:00:00.000Z',
          },
        ]}
        models={[
          {
            brandId: 'brand-1',
            createdAt: '2026-01-01T00:00:00.000Z',
            id: 'model-1',
            name: 'Corolla',
            updatedAt: '2026-01-01T00:00:00.000Z',
          },
        ]}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />,
    );

    expect(screen.getByText('Corolla XLE')).toBeInTheDocument();
    expect(screen.getByText('Corolla')).toBeInTheDocument();
    expect(screen.getByText('$23,000.00')).toBeInTheDocument();
  });
});
