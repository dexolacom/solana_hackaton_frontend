import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '@/lib/api/api';

export const useSolanaProjectById = (id?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['projectById'],
    queryFn: () => getProjectById(id || ''),
    enabled: !!id
  })

  const projectById = data?.data?.tokens;

  return { projectById, isLoading }
}