import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrandsPage } from '@/features/brands/pages/brands-page';

const createMutateAsyncMock = vi.fn();
const updateMutateAsyncMock = vi.fn();
const deleteMutateAsyncMock = vi.fn();
const successMock = vi.fn();
const errorMock = vi.fn();

vi.mock('@/features/brands/hooks/use-brands', () => ({
  useBrands: () => ({
    data: [
      {
        createdAt: '2026-01-01T00:00:00.000Z',
        createdBy: 'user-1',
        id: 'brand-1',
        name: 'Toyota',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
    ],
    isLoading: false,
  }),
}));

vi.mock('@/features/brands/hooks/use-brand-mutations', () => ({
  useBrandMutations: () => ({
    createMutation: { isPending: false, mutateAsync: createMutateAsyncMock },
    deleteMutation: { isPending: false, mutateAsync: deleteMutateAsyncMock },
    updateMutation: { isPending: false, mutateAsync: updateMutateAsyncMock },
  }),
}));

vi.mock('@/shared/hooks/use-notification', () => ({
  useNotification: () => ({ error: errorMock, success: successMock }),
}));

vi.mock('@/features/brands/components/brand-table', () => ({
  BrandTable: ({ data, onDelete, onEdit }: any) => (
    <div>
      <button onClick={() => onEdit(data[0])}>edit-row</button>
      <button onClick={() => onDelete(data[0])}>delete-row</button>
    </div>
  ),
}));

vi.mock('@/features/brands/components/brand-form-modal', () => ({
  BrandFormModal: ({ open, onSubmit }: any) =>
    open ? <button onClick={() => onSubmit({ name: 'Mazda' })}>submit-modal</button> : null,
}));

describe('BrandsPage', () => {
  beforeEach(() => {
    createMutateAsyncMock.mockReset().mockResolvedValue({});
    updateMutateAsyncMock.mockReset().mockResolvedValue({});
    deleteMutateAsyncMock.mockReset().mockResolvedValue(undefined);
    successMock.mockReset();
    errorMock.mockReset();
  });

  it('creates a brand from modal submit', async () => {
    const user = userEvent.setup();
    render(<BrandsPage />);

    await user.click(screen.getByRole('button', { name: /new brand/i }));
    await user.click(screen.getByRole('button', { name: 'submit-modal' }));

    await waitFor(() => {
      expect(createMutateAsyncMock).toHaveBeenCalledWith({ name: 'Mazda' });
      expect(successMock).toHaveBeenCalledWith('Brand created');
    });
  });

  it('updates a brand when editing from table', async () => {
    const user = userEvent.setup();
    render(<BrandsPage />);

    await user.click(screen.getByRole('button', { name: 'edit-row' }));
    await user.click(screen.getByRole('button', { name: 'submit-modal' }));

    await waitFor(() => {
      expect(updateMutateAsyncMock).toHaveBeenCalledWith({
        id: 'brand-1',
        payload: { name: 'Mazda' },
      });
      expect(successMock).toHaveBeenCalledWith('Brand updated');
    });
  });

  it('deletes a brand from table action', async () => {
    const user = userEvent.setup();
    render(<BrandsPage />);

    await user.click(screen.getByRole('button', { name: 'delete-row' }));

    await waitFor(() => {
      expect(deleteMutateAsyncMock).toHaveBeenCalledWith('brand-1');
      expect(successMock).toHaveBeenCalledWith('Brand deleted');
    });
  });
});
