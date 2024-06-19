import { useGetNfts } from '@/lib/blockchain/hooks/useGetNfts';
// import { useQueries } from '@tanstack/react-query';
// import { useSolanaRate } from '@/lib/api/hooks/useSolanaRate';
import { addressClassicCollection, addressEcosystemCollection } from '@/lib/blockchain/constant';
// import { PublicKey } from '@solana/web3.js';
// import { getCoinData } from '../helpers/getCoinData';
// import { connection } from '@/lib/blockchain/constant';
import { useEffect, useState } from 'react';
// import { OperationType, decimalsOperations } from '@/lib/helpers/decimalsOperations';

export const useNftData = () => {
  const [cards, setCards] = useState<Record<string, any[]>>();
  // const [invested, setInvested] = useState<Record<string, number>>({});
  const { tokens, isLoading: isLoadingTokens } = useGetNfts();

  // const { solanaRate } = useSolanaRate();

  // const usdcData = getCoinData('USDC');
  // const solData = getCoinData('SOL');

  // const data = useQueries({
  //   queries: tokens?.map((token) => ({
  //     queryKey: ['transaction', token],
  //     queryFn: () => getTransaction(token.mintAddress, token?.collection?.key?.toString()),
  //     staleTime: Infinity
  //   })),
  //   combine: (results) => {
  //     return {
  //       data: results.map((result) => result.data),
  //       pending: results.some((result) => result.isPending)
  //     };
  //   }
  // });

  useEffect(() => {
      const classicCards = tokens.filter(
        (element) => element?.collection.key.toString() === addressClassicCollection
      );
      const ecosystemCards = tokens.filter(
        (element) => element?.collection.key.toString() === addressEcosystemCollection
      );
      setCards({
        all: tokens,
        classic: classicCards,
        ecosystem: ecosystemCards
      });

    

    // if (data && !data.pending) {
    //   const newNftData = tokens
    //     ?.map((item) => ({
    //       ...item,
    //       content: { ...data?.data?.find((element) => element?.mint === item.mintAddress) }
    //     }))
    //     .sort((a, b) => +a?.name?.replace(/\D/g, '') - +b?.name?.replace(/\D/g, ''));

    //   const invested = data?.data.reduce((accumulator, item) => {
    //     return accumulator + (item?.investedPrice ?? 0);
    //   }, 0);

    //   const classicInvested = newNftData
    //     .filter((element) => element?.collection.key.toString() === addressClassicCollection)
    //     .reduce((accumulator, item) => accumulator + (item?.content?.investedPrice ?? 0), 0);

    //   const ecosystemInvested = newNftData
    //     .filter((element) => element?.collection.key.toString() === addressEcosystemCollection)
    //     .reduce((accumulator, item) => accumulator + (item?.content?.investedPrice ?? 0), 0);

    //   const classicCards = newNftData.filter(
    //     (element) => element?.collection.key.toString() === addressClassicCollection
    //   );
    //   const ecosystemCards = newNftData.filter(
    //     (element) => element?.collection.key.toString() === addressEcosystemCollection
    //   );
    //   setCards({
    //     all: newNftData,
    //     classic: classicCards,
    //     ecosystem: ecosystemCards
    //   });

    //   setInvested({
    //     all: invested ?? 0,
    //     classic: classicInvested ?? 0,
    //     ecosystem: ecosystemInvested ?? 0
    //   });
    // }
  }, [tokens]);

  // const getTransaction = async (mint: PublicKey, collectionAddress: string) => {
  //   const signatures = await connection.getSignaturesForAddress(mint);

  //   const firstSignarure = signatures[signatures.length - 4].signature;
  //   const secondtSignarure = signatures[signatures.length - 3].signature;  

  //   const parsedTransactionFirst = await connection.getParsedTransaction(firstSignarure, {
  //     maxSupportedTransactionVersion: 0
  //   });

  //   const parsedTransactionSecond = await connection.getParsedTransaction(secondtSignarure, {
  //     maxSupportedTransactionVersion: 0
  //   });
    

  //   const dataForAmountFirst = parsedTransactionFirst?.meta?.innerInstructions?.[0].instructions;
  //   const dataForAmountSecond = parsedTransactionSecond?.meta?.innerInstructions?.[0].instructions;

  //   let tokensAmount;
  //   if(collectionAddress === addressClassicCollection) { 
  //     tokensAmount = {
  //     //@ts-ignore
  //     BTC: dataForAmountFirst ?.[5]?.parsed?.info?.amount,
  //     //@ts-ignore
  //     ETH: dataForAmountFirst ?.[11]?.parsed?.info?.amount,
  //     //@ts-ignore
  //     SOL: dataForAmountFirst ?.[8]?.parsed?.info?.amount,
  //     //@ts-ignore
  //     JUP: dataForAmountFirst ?.[14]?.parsed?.info?.amount
  //   };
  // } else {
  //   tokensAmount = {
  //     //@ts-ignore
  //     BTC: dataForAmountSecond ?.[5]?.parsed?.info?.amount,
  //     //@ts-ignore
  //     ETH: dataForAmountSecond ?.[11]?.parsed?.info?.amount,
  //     //@ts-ignore
  //     SOL: dataForAmountSecond ?.[8]?.parsed?.info?.amount,
  //     //@ts-ignore
  //     JUP: dataForAmountSecond ?.[14]?.parsed?.info?.amount
  //   };
  // }

  //   const tokenAddress = parsedTransactionFirst?.meta?.preTokenBalances?.[0].mint;
  //   const isUsdcToken = tokenAddress === usdcData.mint;

  //   //@ts-ignore
  //   const amount = parsedTransaction?.meta?.innerInstructions[0].instructions[2].parsed.info.amount;
  //   const convertAmount = isUsdcToken
  //     ? decimalsOperations(amount, 1e6, OperationType.DIV)
  //     : decimalsOperations(amount, solData.decimals, OperationType.DIV);

  //   const date = new Date(parsedTransactionFirst!.blockTime! * 1000);
  //   const formattedDate = date.toLocaleString();
  //   console.log("🚀 ~ getTransaction ~ formattedDate:", formattedDate)
  //   const investedPrice = isUsdcToken
  //     ? convertAmount
  //     : decimalsOperations(solanaRate ?? 0, convertAmount, OperationType.MUL);

  //   return { investedPrice, formattedDate, mint, tokensAmount };
  // };

  const isLoading = isLoadingTokens ;
  // || data.pending;
  const invested = {
        all: 0,
        classic: 0,
        ecosystem: 0
      }

  return { cards, isLoading, invested };
};
