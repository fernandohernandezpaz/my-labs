import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createModel, deleteModel, updateModel } from '@/features/models/api/models.api';
import { queryKeys } from '@/shared/constants/query-keys';
import type { UpdateModelDto } from '@/features/models/model/model.types';

export const useModelMutations = () => {
  const queryClient = useQueryClient();

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.models });
  };

  return {
    createMutation: useMutation({ mutationFn: createModel, onSuccess }),
    deleteMutation: useMutation({ mutationFn: deleteModel, onSuccess }),
    updateMutation: useMutation({
      mutationFn: ({ id, payload }: { id: string; payload: UpdateModelDto }) =>
        updateModel(id, payload),
      onSuccess,
    }),
  };
};
