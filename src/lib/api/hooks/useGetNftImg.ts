import { useQuery } from '@tanstack/react-query'
import { getNftImg } from '@/lib/api/api'

export const useGetNftImg = (uri: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getNftImg'],
    queryFn: () => getNftImg(uri),
  })

  const nftImg = data?.data?.image;

  return { nftImg, isLoading, isError }
}
