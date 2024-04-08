import { useGetNfts } from '@/lib/blockchain/hooks/useGetNfts'
import { useQueries } from '@tanstack/react-query';
import { useSolanaRate } from '@/lib/api/hooks/useSolanaRate';
import { decimalsToken, usdcAddress } from '@/lib/blockchain/constant';
import { PublicKey } from '@solana/web3.js';
import { connection } from '@/lib/blockchain/constant';
import { useEffect, useState } from 'react';
import { ConfirmedSignatureInfo } from '@solana/web3.js';
import { useAppContext } from '@/providers/AppProvider/AppProvider';

export const useTotalInvested = () => {
  const { solanaRate } = useSolanaRate();
  const [transactions, setTransactions] = useState<ConfirmedSignatureInfo[]>([]);

  // const {setInvested} = useAppContext();
//  
  // const data = useQueries({
  //   queries: transactions.map((transaction) => ({
  //     queryKey: ['transaction', token.metadata.mint],
  //     queryFn: () => getTransaction(token.metadata.mint),
  //     staleTime: Infinity,
  //   })),
  //   combine: (results) => {
  //     return {
  //       data: results.map((result) => result.data),
  //       pending: results.some((result) => result.isPending),
  //     }
  //   },
  // })

  // useEffect(() => {
  //   if (!data.pending) {
  //     const newNftData = tokens?.map(item => ({
  //       ...item,
  //       content: { ...data?.data?.find(element => element?.mint === item.metadata.mint) }
  //     }))
  //     const invested = data?.data.reduce((accumulator, item) => {
  //       return accumulator + (item?.investedPrice ?? 0);
  //     }, 0);
  //     setCards(newNftData);
  //     setInvested(invested);
  //   }
  // }, [data?.pending])

  const getTransaction = async (mintCollection: string) => {
    
    const signatures = await connection.getSignaturesForAddress(new PublicKey(mintCollection));
    setTransactions(signatures)
    const parsedTransaction = await connection.getParsedTransaction( signatures[0].signature);
    const tokenAddress = parsedTransaction?.meta?.preTokenBalances?.[0].mint;
    console.log("🚀 ~ getTransaction ~ tokenAddress:", tokenAddress)

    const isUsdcToken = tokenAddress === usdcAddress;
    //@ts-ignore
    const amount = parsedTransaction?.meta?.innerInstructions?.[0].instructions.find(item => item.parsed.type === 'transfer').parsed.info.amount;
    const convertAmount = isUsdcToken ? amount / decimalsToken['USDC'] : amount / decimalsToken['SOL'];

    const investedPrice = isUsdcToken ? convertAmount : (solanaRate ?? 0) * convertAmount;




    return {signatures};
   
    // const signaturesLength = signatures.length;
    // const firstSignarure = signatures[signaturesLength - 1].signature;

    // const parsedTransaction = await connection.getParsedTransaction(firstSignarure);
    // const tokenAddress = parsedTransaction?.meta?.preTokenBalances?.[0].mint;
    // const isUsdcToken = tokenAddress === usdcAddress;
    // //@ts-ignore
    // const amount = parsedTransaction?.meta?.innerInstructions?.[0].instructions.find(item => item.parsed.type === 'transfer').parsed.info.amount;
    // const convertAmount = isUsdcToken ? amount / decimalsToken['USDC'] : amount / decimalsToken['SOL'];

    // const investedPrice = isUsdcToken ? convertAmount : (solanaRate ?? 0) * convertAmount;

    // return { investedPrice };
  }

  // const isLoading = isLoadingTokens || data.pending

  return {getTransaction}
}