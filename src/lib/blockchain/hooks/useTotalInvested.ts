import { useSolanaRate } from '@/lib/api/hooks/useSolanaRate';
import { decimalsToken, usdcAddress } from '@/lib/blockchain/constant';
import { PublicKey } from '@solana/web3.js';
import { connection } from '@/lib/blockchain/constant';
import { useQuery } from '@tanstack/react-query';


export const useTotalInvested = (mintCollection: string) => {
  const { solanaRate } = useSolanaRate();

  const getTransactions = async (mintCollection: string) => {
    console.log('WORK')
    const signatures = await connection.getSignaturesForAddress(new PublicKey(mintCollection));

    const transactions: any[] = [];

    let i = 0;
    while (i < signatures.length) {
      const chunk = signatures.slice(i, i + 10);
      i += 10;

      const currentTransactions = await Promise.all(chunk.map(async (item) => {
        return await connection.getParsedTransaction(item.signature);
      }));
      transactions.push(currentTransactions)
    }

    const totalInvestedPrice = transactions.flat().filter(item => item.meta?.innerInstructions?.[0].instructions.length === 24).reduce((acc, transaction) => {

      const tokenAddress = transaction?.meta?.preTokenBalances?.[0].mint;

      const isUsdcToken = tokenAddress === usdcAddress;
      //@ts-ignore
      const amount = transaction?.meta?.innerInstructions?.[0].instructions.find(item => item.parsed.type === 'transfer').parsed.info.amount;
      const convertAmount = isUsdcToken ? amount / decimalsToken['USDC'] : amount / decimalsToken['SOL'];

      const investedPrice = isUsdcToken ? convertAmount : (solanaRate ?? 0) * convertAmount;
      console.log("🚀 ~ totalInvestedPrice ~ investedPrice:", investedPrice)

      return acc + investedPrice;
    }, 0);
    return totalInvestedPrice;

  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['totalInvested'],
    queryFn: () => getTransactions(mintCollection),
    staleTime: 30000,
    enabled: !!solanaRate
  })

  return { data, isLoading, isError }
};

