import { useProjectList } from '@/lib/api/hooks/useProjectList.ts'
import { useSolanaProjectById } from '@/lib/api/hooks/useSolanaProjectById.ts'

export const useSolanaRate = () => {
  const { projectId } = useProjectList('Classic')
  const { projectById } = useSolanaProjectById(projectId)

  const solanaRate = projectById?.find((item) => item.name === 'Solana')?.coinPrice

  return { solanaRate }
}
