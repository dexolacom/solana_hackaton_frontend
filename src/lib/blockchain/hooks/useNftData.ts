import { useGetNfts } from '@/lib/blockchain/hooks/useGetNfts'
import { useQueries } from '@tanstack/react-query';
import { useSolanaRate } from '@/lib/api/hooks/useSolanaRate';
import { addressClassicCollection, addressEcosystemCollection } from '@/lib/blockchain/constant';
import { PublicKey } from '@solana/web3.js';
import { getCoinData } from '../helpers/getCoinData';
import { connection } from '@/lib/blockchain/constant';
import { useEffect, useState } from 'react';


export const useNftData = () => {
  const [cards, setCards] = useState<Record<string, any[]>>();
  const [invested, setInvested] = useState<Record<string, number>>({});
  const { tokens, isLoading: isLoadingTokens } = useGetNfts();

  const { solanaRate } = useSolanaRate();

  const usdcData = getCoinData('USDC');
  const solData = getCoinData('SOL');

  const data = useQueries({
    queries: tokens?.map((token) => ({
      queryKey: ['transaction', token.mintAddress
        ],
      queryFn: () => getTransaction(token.mintAddress
        ),
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
        content: { ...data?.data?.find(element => element?.mint=== item.mintAddress) }
      })).sort((a, b) => (+a?.name?.replace(/\D/g, "")) - (+b?.name?.replace(/\D/g, "")));

      const invested = data?.data.reduce((accumulator, item) => {
        return accumulator + (item?.investedPrice ?? 0);
      }, 0);
  
      const classicInvested = newNftData.filter(element => element?.collection.key.toString() === addressClassicCollection)
        .reduce((accumulator, item) => accumulator + (item?.content?.investedPrice ?? 0), 0);

      const ecosystemInvested = newNftData.filter(element => element?.collection.key.toString() === addressEcosystemCollection)
        .reduce((accumulator, item) => accumulator + (item?.content?.investedPrice ?? 0), 0);

      const classicCards = newNftData.filter(element => element?.collection.key.toString() === addressClassicCollection)
      const ecosystemCards = newNftData.filter(element => element?.collection.key.toString() === addressEcosystemCollection)
      setCards({
        'all': newNftData,
        'classic': classicCards,
        'ecosystem': ecosystemCards
      }
      );

      setInvested({
        'all': invested ?? 0,
        'classic': classicInvested ?? 0,
        'ecosystem': ecosystemInvested ?? 0
      });
    }
  }, [data?.pending])

  const getTransaction = async (mint: string) => {

    const signatures = await connection.getSignaturesForAddress(new PublicKey(mint))

    const firstSignarure = signatures[signatures.length - 2].signature;

    const parsedTransaction = await connection.getParsedTransaction(firstSignarure, {
      maxSupportedTransactionVersion: 0,
    });

    const dataForAmount = parsedTransaction?.meta?.innerInstructions?.[0].instructions;

    const tokensAmount = {
        //@ts-ignore
      'BTC': dataForAmount?.[5]?.parsed?.info?.amount,
       //@ts-ignore
      'ETH': dataForAmount?.[11]?.parsed?.info?.amount,
       //@ts-ignore
      'SOL': dataForAmount?.[8]?.parsed?.info?.amount,
       //@ts-ignore
      'JUP': dataForAmount?.[14]?.parsed?.info?.amount,
    }
  
    const tokenAddress = parsedTransaction?.meta?.preTokenBalances?.[0].mint;
    const isUsdcToken = tokenAddress === usdcData.mint;

    //@ts-ignore
    const amount = parsedTransaction?.meta?.innerInstructions[0].instructions[2].parsed.info.amount
    const convertAmount = isUsdcToken ? amount / 10e4 : amount / solData.decimals;

    const date = new Date(parsedTransaction!.blockTime! * 1000);
    const formattedDate = date.toLocaleString();
    const investedPrice = isUsdcToken ? convertAmount : (solanaRate ?? 0) * convertAmount;

    return { investedPrice, formattedDate, mint, tokensAmount };
  }

  const isLoading = isLoadingTokens || data.pending;


  return { cards, isLoading, invested}
}