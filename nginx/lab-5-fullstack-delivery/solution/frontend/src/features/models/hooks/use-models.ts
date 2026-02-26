import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/constants/query-keys';
import { getModels } from '@/features/models/api/models.api';

export const useModels = () =>
  useQuery({
    queryFn: getModels,
    queryKey: queryKeys.models,
  });
