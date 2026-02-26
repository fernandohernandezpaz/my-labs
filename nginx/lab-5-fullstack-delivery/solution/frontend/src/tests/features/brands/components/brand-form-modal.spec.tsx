import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrandFormModal } from '@/features/brands/components/brand-form-modal';

describe('BrandFormModal', () => {
  it('submits entered brand name', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    render(
      <BrandFormModal
        onClose={() => undefined}
        onSubmit={onSubmit}
        open
      />,
    );

    const nameInput = document.querySelector('input[name="name"]');
    expect(nameInput).toBeTruthy();

    await user.type(nameInput as Element, 'Honda');
    await user.click(screen.getByRole('button', { name: 'Create' }));

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit.mock.calls[0]?.[0]).toEqual({ name: 'Honda' });
  });
});
