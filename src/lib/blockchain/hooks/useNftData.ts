import { useGetNfts } from '@/lib/blockchain/hooks/useGetNfts'
import { useQueries } from '@tanstack/react-query';
import { useSolanaRate } from '@/lib/api/hooks/useSolanaRate';
import { PublicKey } from '@solana/web3.js';
import { connection } from '@/lib/blockchain/constant';
import { useEffect, useState } from 'react';
import { useAppContext } from '@/providers/AppProvider/AppProvider';
import { getCoinData } from '../helpers/getCoinData';

export const useNftData = () => {
  const [cards, setCards] = useState<any[]>([]);
  const { tokens, isLoading: isLoadingTokens } = useGetNfts();
  const { solanaRate } = useSolanaRate();
  const {setInvested} = useAppContext();

  const usdcData = getCoinData('USDT');
  const solData = getCoinData('SOL');
 
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

      setCards(newNftData);
      setInvested(invested);
    }
  }, [data?.pending])

  const getTransaction = async (mint: string) => {
    const signatures = await connection.getSignaturesForAddress(new PublicKey(mint))
    // const signaturesLength = signatures.length;
    const firstSignarure = signatures[0].signature;
    console.log("🚀 ~ getTransaction ~ firstSignarure:", firstSignarure)

    const parsedTransaction = await connection.getParsedTransaction('67pFUeMGZ9kvvaba9KHzpy4ZDuavCqZ7MuJb5NXEsXie6LfuLcLTUSeyY7E2SFn4uscdS2K9mC6WgBjhbvV1kwkw');
    console.log("🚀 ~ getTransaction ~ parsedTransaction:", parsedTransaction)
    const tokenAddress = parsedTransaction?.meta?.preTokenBalances?.[0].mint;
    console.log("🚀 ~ getTransaction ~ tokenAddress:", tokenAddress)
    const isUsdcToken = tokenAddress === usdcData.mint;
    //@ts-ignore
    const amount = parsedTransaction?.meta?.innerInstructions?.[0].instructions.find(item => item.parsed.type === 'transfer').parsed.info.amount;
    const convertAmount = isUsdcToken ? amount / usdcData.decimals : amount / solData.decimals;

    const date = new Date(parsedTransaction!.blockTime! * 1000);
    const formattedDate = date.toLocaleString();
    const investedPrice = isUsdcToken ? convertAmount : (solanaRate ?? 0) * convertAmount;

    return { investedPrice, formattedDate, mint };
  }

  const isLoading = isLoadingTokens || data.pending

  return {cards, isLoading}
}