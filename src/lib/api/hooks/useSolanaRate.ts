import { useParams } from 'react-router-dom';
import { useSolanaProjectById } from '@/lib/api/hooks/useSolanaProjectById.ts'

export const useSolanaRate = () => {
  const { id } = useParams();
  const { projectById } = useSolanaProjectById(id ?? '');

  const solanaRate = projectById?.find((item) => item.name === 'Solana')?.coinPrice

  return { solanaRate }
}
