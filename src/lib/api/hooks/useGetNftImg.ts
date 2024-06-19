import { useQuery } from '@tanstack/react-query';
import { getNftImg } from '@/lib/api/api';

export const useGetNftImg = (uri: string) => {

  const { data, isLoading, isError } = useQuery({
    queryKey: [uri],
    queryFn: () => getNftImg(uri),
    staleTime: Infinity
  });
  const img = data?.data?.image;

  return { img, isLoading, isError };
};
