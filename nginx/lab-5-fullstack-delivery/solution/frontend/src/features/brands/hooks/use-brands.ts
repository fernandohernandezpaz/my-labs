import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/constants/query-keys';
import { getBrands } from '@/features/brands/api/brands.api';

export const useBrands = () =>
  useQuery({
    queryFn: getBrands,
    queryKey: queryKeys.brands,
  });
