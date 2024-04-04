import { useQuery } from '@tanstack/react-query'
import { getProjectList } from '@/lib/api/api'

export const useProjectList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['projectList'],
    queryFn: () => getProjectList(),
    staleTime: 300000,
  })

  const projectList = data?.data

  return { projectList, isLoading }
}
