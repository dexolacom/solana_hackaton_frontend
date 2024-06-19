import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '@/lib/api/api';

export const useSolanaProjectById = (id: string | null) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['projectById', id],
    queryFn: () => getProjectById(id || ''),
    enabled: !!id,
    staleTime: 60000
  });

  const projectById = data?.data?.tokens;

  return { projectById, isLoading, isError };
};
