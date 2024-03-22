import { useQuery } from '@tanstack/react-query'
import { getProjectList } from '@/lib/api/api'

export const useProjectList = (projectTitle: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['projectList'],
    queryFn: () => getProjectList(),
  })

  const projectList = data?.data
  const projectId = projectList?.find((item) => item.name === projectTitle)?.id

  return { projectId, projectList, isLoading }
}
