import { useQuery } from '@tanstack/react-query'
import { getProjectList } from '@/lib/api/api'

export const useProjectList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['projectList'],
    queryFn: () => getProjectList(),
    staleTime: Infinity,
  })

  const projectList = data?.data

  return { projectList, isLoading }
}
