import { useQuery } from '@tanstack/react-query';
import { getProjectList } from '@/lib/api/api';
import { OperationType, decimalsOperations } from '@/lib/helpers/decimalsOperations';
import { classicPotrfolioId, ecosystemPortfolioId } from '@/lib/blockchain/constant';

export const useProjectList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['projectList'],
    queryFn: () => getProjectList(),
    staleTime: 30000
  });

  const projectList = data?.data;

  const ecosystem = projectList?.find((item) => item.collectionId === ecosystemPortfolioId);
  const classic = projectList?.find((item) => item.collectionId === classicPotrfolioId);

  const ecosystemProjectId = ecosystem?.id;
  const classicProjectId = classic?.id;

  const classicInvested = decimalsOperations(classic?.totalAmount ?? 0, 1e6, OperationType.DIV);

  const ecosystemInvested = decimalsOperations(ecosystem?.totalAmount ?? 0, 1e6, OperationType.DIV);

  return { projectList, isLoading, ecosystemInvested, classicInvested, ecosystemProjectId, classicProjectId };
};
