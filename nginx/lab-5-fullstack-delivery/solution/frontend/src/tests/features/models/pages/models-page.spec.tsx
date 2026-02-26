import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModelsPage } from '@/features/models/pages/models-page';

const createMutateAsyncMock = vi.fn();
const updateMutateAsyncMock = vi.fn();
const deleteMutateAsyncMock = vi.fn();
const successMock = vi.fn();
const errorMock = vi.fn();

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
    isLoading: false,
  }),
}));

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
  }),
}));

vi.mock('@/features/models/hooks/use-model-mutations', () => ({
  useModelMutations: () => ({
    createMutation: { isPending: false, mutateAsync: createMutateAsyncMock },
    deleteMutation: { isPending: false, mutateAsync: deleteMutateAsyncMock },
    updateMutation: { isPending: false, mutateAsync: updateMutateAsyncMock },
  }),
}));

vi.mock('@/shared/hooks/use-notification', () => ({
  useNotification: () => ({ error: errorMock, success: successMock }),
}));

vi.mock('@/features/models/components/model-table', () => ({
  ModelTable: ({ data, onDelete, onEdit }: any) => (
    <div>
      <button onClick={() => onEdit(data[0])}>edit-row</button>
      <button onClick={() => onDelete(data[0])}>delete-row</button>
    </div>
  ),
}));

vi.mock('@/features/models/components/model-form-modal', () => ({
  ModelFormModal: ({ open, onSubmit }: any) =>
    open ? <button onClick={() => onSubmit({ brandId: 'brand-1', name: 'Sentra' })}>submit-modal</button> : null,
}));

describe('ModelsPage', () => {
  beforeEach(() => {
    createMutateAsyncMock.mockReset().mockResolvedValue({});
    updateMutateAsyncMock.mockReset().mockResolvedValue({});
    deleteMutateAsyncMock.mockReset().mockResolvedValue(undefined);
    successMock.mockReset();
    errorMock.mockReset();
  });

  it('creates a model from modal submit', async () => {
    const user = userEvent.setup();
    render(<ModelsPage />);

    await user.click(screen.getByRole('button', { name: /new model/i }));
    await user.click(screen.getByRole('button', { name: 'submit-modal' }));

    await waitFor(() => {
      expect(createMutateAsyncMock).toHaveBeenCalledWith({ brandId: 'brand-1', name: 'Sentra' });
      expect(successMock).toHaveBeenCalledWith('Model created');
    });
  });

  it('updates a model when editing from table', async () => {
    const user = userEvent.setup();
    render(<ModelsPage />);

    await user.click(screen.getByRole('button', { name: 'edit-row' }));
    await user.click(screen.getByRole('button', { name: 'submit-modal' }));

    await waitFor(() => {
      expect(updateMutateAsyncMock).toHaveBeenCalledWith({
        id: 'model-1',
        payload: { brandId: 'brand-1', name: 'Sentra' },
      });
      expect(successMock).toHaveBeenCalledWith('Model updated');
    });
  });

  it('deletes a model from table action', async () => {
    const user = userEvent.setup();
    render(<ModelsPage />);

    await user.click(screen.getByRole('button', { name: 'delete-row' }));

    await waitFor(() => {
      expect(deleteMutateAsyncMock).toHaveBeenCalledWith('model-1');
      expect(successMock).toHaveBeenCalledWith('Model deleted');
    });
  });
});
