import { useSearchParams } from "react-router-dom";
import { useSolanaProjectById } from '@/lib/api/hooks/useSolanaProjectById.ts'

export const useSolanaRate = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('prjId');
  const { projectById } = useSolanaProjectById(projectId);

  const solanaRate = projectById?.find((item) => item.name === 'Solana')?.coinPrice

  return { solanaRate }
}
