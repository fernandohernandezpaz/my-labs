import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct, deleteProduct, updateProduct } from '@/features/products/api/products.api';
import { queryKeys } from '@/shared/constants/query-keys';
import type { UpdateProductDto } from '@/features/products/model/product.types';

export const useProductMutations = () => {
  const queryClient = useQueryClient();

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.products });
  };

  return {
    createMutation: useMutation({ mutationFn: createProduct, onSuccess }),
    deleteMutation: useMutation({ mutationFn: deleteProduct, onSuccess }),
    updateMutation: useMutation({
      mutationFn: ({ id, payload }: { id: string; payload: UpdateProductDto }) =>
        updateProduct(id, payload),
      onSuccess,
    }),
  };
};
