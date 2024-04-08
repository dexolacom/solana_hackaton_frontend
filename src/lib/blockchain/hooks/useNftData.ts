import { useGetNfts } from '@/lib/blockchain/hooks/useGetNfts'
import { useQueries } from '@tanstack/react-query';
import { useSolanaRate } from '@/lib/api/hooks/useSolanaRate';
import { addressClassicCollection, addressEcosystemCollection} from '@/lib/blockchain/constant';
import { PublicKey } from '@solana/web3.js';
import { getCoinData } from '../helpers/getCoinData';
import { connection } from '@/lib/blockchain/constant';
import { useEffect, useState } from 'react';


export const useNftData = () => {
  const [cards, setCards] = useState<any[]>([]);
  const { tokens, isLoading: isLoadingTokens } = useGetNfts();
  const { solanaRate } = useSolanaRate();


  const usdcData = getCoinData('USDC');
  const solData = getCoinData('SOL');
 
  
  const [invested, setInvested] = useState<Record<string, number>>({});

  const data = useQueries({
    queries: tokens?.map((token) => ({
      queryKey: ['transaction', token.metadata.mint],
      queryFn: () => getTransaction(token.metadata.mint),
      staleTime: Infinity,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      }
    },
  })

  useEffect(() => {

    if (!data.pending) {
      const newNftData = tokens?.map(item => ({
        ...item,
        content: { ...data?.data?.find(element => element?.mint === item.metadata.mint) }
      }))
      const invested = data?.data.reduce((accumulator, item) => {
        return accumulator + (item?.investedPrice ?? 0);
      }, 0);
  
      const classicInvested = newNftData.filter(element => element?.metadata.collection.value.key === addressClassicCollection)
        .reduce((accumulator, item) => accumulator + (item?.content?.investedPrice ?? 0), 0);
 
      

      const ecosystemInvested = newNftData.filter(element => element?.metadata.collection.value.key === addressEcosystemCollection)
        .reduce((accumulator, item) => accumulator + (item?.content?.investedPrice ?? 0), 0);
     

      setCards(newNftData);
      setInvested({'all': invested,
        'classic': classicInvested,
        'ecosystem': ecosystemInvested
      });
    }
  }, [data?.pending])

  const getTransaction = async (mint: string) => {

    const signatures = await connection.getSignaturesForAddress(new PublicKey(mint))
  
    const firstSignarure = signatures[0].signature;


    const parsedTransaction = await connection.getParsedTransaction(firstSignarure, {

      maxSupportedTransactionVersion: 0,
    });

    const tokenAddress = parsedTransaction?.meta?.preTokenBalances?.[0].mint;

    const isUsdcToken = tokenAddress === usdcData.mint;

    //@ts-ignore
    const amount = parsedTransaction?.meta?.innerInstructions[0].instructions[2].parsed.info.amount
    const convertAmount = isUsdcToken ? amount / 10e4 : amount / solData.decimals;

    const date = new Date(parsedTransaction!.blockTime! * 1000);
    const formattedDate = date.toLocaleString();
    const investedPrice = isUsdcToken ? convertAmount : (solanaRate ?? 0) * convertAmount;

    return { investedPrice, formattedDate, mint };
  }

  const isLoading = isLoadingTokens || data.pending

  return { cards, isLoading, invested }
}