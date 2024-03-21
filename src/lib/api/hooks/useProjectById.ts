import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '@/lib/api/api';

export const useProjectById = (id?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['projectById'],
    queryFn: id ? () => getProjectById(id) : undefined,
  })

  const projectById = data?.data?.tokens;

  return { projectById, isLoading }
}