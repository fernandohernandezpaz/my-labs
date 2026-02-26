import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBrand, deleteBrand, updateBrand } from '@/features/brands/api/brands.api';
import { queryKeys } from '@/shared/constants/query-keys';

export const useBrandMutations = () => {
  const queryClient = useQueryClient();

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.brands });
  };

  return {
    createMutation: useMutation({ mutationFn: createBrand, onSuccess }),
    deleteMutation: useMutation({ mutationFn: deleteBrand, onSuccess }),
    updateMutation: useMutation({
      mutationFn: ({ id, payload }: { id: string; payload: { name?: string } }) =>
        updateBrand(id, payload),
      onSuccess,
    }),
  };
};
