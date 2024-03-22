import { useQuery } from '@tanstack/react-query'
import { getProjectById } from '@/lib/api/api'

export const useSolanaProjectById = (id?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['projectById', id],
    queryFn: () => getProjectById(id || ''),
    enabled: !!id,
    refetchInterval: 60000,
  })

  const projectById = data?.data?.tokens

  return { projectById, isLoading }
}
