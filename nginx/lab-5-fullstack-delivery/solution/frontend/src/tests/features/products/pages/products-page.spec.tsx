import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductsPage } from '@/features/products/pages/products-page';

const createMutateAsyncMock = vi.fn();
const updateMutateAsyncMock = vi.fn();
const deleteMutateAsyncMock = vi.fn();
const successMock = vi.fn();
const errorMock = vi.fn();

vi.mock('@/features/products/hooks/use-products', () => ({
  useProducts: () => ({
    data: [
      {
        createdAt: '2026-01-01T00:00:00.000Z',
        id: 'product-1',
        modelId: 'model-1',
        name: 'Corolla XLE',
        price: 23000,
        stock: 5,
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
    ],
    isLoading: false,
  }),
}));

vi.mock('@/features/models/hooks/use-models', () => ({
  useModels: () => ({
    data: [
      {
        brandId: 'brand-1',
        createdAt: '2026-01-01T00:00:00.000Z',
        id: 'model-1',
        name: 'Corolla',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
    ],
  }),
}));

vi.mock('@/features/products/hooks/use-product-mutations', () => ({
  useProductMutations: () => ({
    createMutation: { isPending: false, mutateAsync: createMutateAsyncMock },
    deleteMutation: { isPending: false, mutateAsync: deleteMutateAsyncMock },
    updateMutation: { isPending: false, mutateAsync: updateMutateAsyncMock },
  }),
}));

vi.mock('@/shared/hooks/use-notification', () => ({
  useNotification: () => ({ error: errorMock, success: successMock }),
}));

vi.mock('@/features/products/components/product-table', () => ({
  ProductTable: ({ data, onDelete, onEdit }: any) => (
    <div>
      <button onClick={() => onEdit(data[0])}>edit-row</button>
      <button onClick={() => onDelete(data[0])}>delete-row</button>
    </div>
  ),
}));

vi.mock('@/features/products/components/product-form-modal', () => ({
  ProductFormModal: ({ open, onSubmit }: any) =>
    open ? (
      <button onClick={() => onSubmit({ modelId: 'model-1', name: 'Corolla LE', price: 22000, stock: 6 })}>
        submit-modal
      </button>
    ) : null,
}));

describe('ProductsPage', () => {
  beforeEach(() => {
    createMutateAsyncMock.mockReset().mockResolvedValue({});
    updateMutateAsyncMock.mockReset().mockResolvedValue({});
    deleteMutateAsyncMock.mockReset().mockResolvedValue(undefined);
    successMock.mockReset();
    errorMock.mockReset();
  });

  it('creates a product from modal submit', async () => {
    const user = userEvent.setup();
    render(<ProductsPage />);

    await user.click(screen.getByRole('button', { name: /new product/i }));
    await user.click(screen.getByRole('button', { name: 'submit-modal' }));

    await waitFor(() => {
      expect(createMutateAsyncMock).toHaveBeenCalledWith({
        modelId: 'model-1',
        name: 'Corolla LE',
        price: 22000,
        stock: 6,
      });
      expect(successMock).toHaveBeenCalledWith('Product created');
    });
  });

  it('updates a product when editing from table', async () => {
    const user = userEvent.setup();
    render(<ProductsPage />);

    await user.click(screen.getByRole('button', { name: 'edit-row' }));
    await user.click(screen.getByRole('button', { name: 'submit-modal' }));

    await waitFor(() => {
      expect(updateMutateAsyncMock).toHaveBeenCalledWith({
        id: 'product-1',
        payload: { modelId: 'model-1', name: 'Corolla LE', price: 22000, stock: 6 },
      });
      expect(successMock).toHaveBeenCalledWith('Product updated');
    });
  });

  it('deletes a product from table action', async () => {
    const user = userEvent.setup();
    render(<ProductsPage />);

    await user.click(screen.getByRole('button', { name: 'delete-row' }));

    await waitFor(() => {
      expect(deleteMutateAsyncMock).toHaveBeenCalledWith('product-1');
      expect(successMock).toHaveBeenCalledWith('Product deleted');
    });
  });
});
