import { useQuery } from '@tanstack/react-query';
import { getTokenList } from '@/lib/api/api';

export const useTokenList = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['tokenList'],
    queryFn: () => getTokenList(),
  })

  const tokenList = data?.data;

  return {tokenList, isLoading}
}