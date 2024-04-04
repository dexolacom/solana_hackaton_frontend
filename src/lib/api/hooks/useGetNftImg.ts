import { useQuery } from '@tanstack/react-query'
import { getNftImg } from '@/lib/api/api'
// import { useEffect, useState } from 'react'

export const useGetNftImg = (uri: string) => {
  // const [img, setImg] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);

  // const fetch = async (uri: string) => {
  //   try {
  //     setIsLoading(true);
  //     setIsSuccess(false);
  //     setIsError(false);
  //     const data = await getNftImg(uri);
  //     if (data) {
  //       setImg(data.data?.image);
  //     }
  //     setIsLoading(false);
  //     setIsSuccess(true);
  //   }
  //   catch {
  //     setIsLoading(false);
  //     setIsError(true);
  //   }
  // }

  // useEffect(() => {
  //   if (uri) {
  //     fetch(uri)
  //   }
  // }, [uri])

  // return { img, isError, isLoading, isSuccess }

  const { data, isLoading, isError } = useQuery({
    queryKey: [uri],
    queryFn: () => getNftImg(uri),
  });
  const img = data?.data?.image;

  return { img, isLoading, isError }
}
