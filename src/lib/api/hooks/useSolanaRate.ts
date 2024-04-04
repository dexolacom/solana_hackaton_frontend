// import { useParams, useLocation } from 'react-router-dom';
import { useSolanaProjectById } from '@/lib/api/hooks/useSolanaProjectById.ts'
import { useProjectList } from './useProjectList';

export enum CollectionType  {
  ECOSYSTEM = 'Solana Ecosystem',
  CLASSIC = 'Classic'
}

export const useSolanaRate = () => {
  //need optimized
  // const { id: paramsId } = useParams();
  // const { pathname } = useLocation();
  // const projectName = pathname.includes('Classic') ? CollectionType.CLASSIC : CollectionType.ECOSYSTEM;
  const projectName = CollectionType.CLASSIC 
  const { projectList } = useProjectList();
  const projectListId = projectList?.find(item => item.name === projectName)?.id;
  // const id = paramsId ? paramsId : projectListId;
  const { projectById } = useSolanaProjectById(projectListId ?? '');
  
  const solanaRate = projectById?.find((item) => item.name === 'Solana')?.coinPrice

  return { solanaRate }
}
