import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/constants/query-keys';
import { getProducts } from '@/features/products/api/products.api';

export const useProducts = () =>
  useQuery({
    queryFn: getProducts,
    queryKey: queryKeys.products,
  });
