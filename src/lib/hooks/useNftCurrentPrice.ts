import { useProjectList } from "@/lib/api/hooks/useProjectList"
import { useSolanaProjectById } from "@/lib/api/hooks/useSolanaProjectById";
import { CollectionType } from "../api/hooks/useSolanaRate";
import { currencyFormatter } from "../utils";

// interface AmountCoinsType {
//   symbol: string
//   amount: number
// }

interface UseCurrentPriceNftArgs {
  collection: CollectionType
}

export const useNftCurrentPrice = ({ collection }: UseCurrentPriceNftArgs) => {
  const tempData = [
    {
      symbol: 'BTC',
      amount: 1,
    },
    {
      symbol: 'SOL',
      amount: 1,
    },
    {
      symbol: 'ETH',
      amount: 1,
    },
    {
      symbol: 'JUP',
      amount: 1,
    },
    {
      symbol: 'RNDR',
      amount: 1,
    },
    {
      symbol: 'HNT',
      amount: 1,
    },
    {
      symbol: 'BONK',
      amount: 1,
    },
    {
      symbol: 'PYTH',
      amount: 1,
    },
  ]
  const { projectList } = useProjectList();
  const classicId = collection === 'Classic' ? projectList?.find(item => item.name === collection)?.id : undefined;
  const ecoSystemId = collection === 'Solana Ecosystem' ? projectList?.find(item => item.name === collection)?.id : undefined;
  const { projectById: classicPrjCoin } = useSolanaProjectById(classicId ?? null);
  const { projectById: ecoSystemPrjCoin } = useSolanaProjectById(ecoSystemId ?? null);

  const coinsToReduce = classicId ? classicPrjCoin : ecoSystemPrjCoin;
  const summCoins = coinsToReduce?.reduce((accumulator, coin) => {
    const amount = tempData.find(item => item.symbol === coin.symbol)?.amount ?? 0;
    return accumulator + (coin.coinPrice * amount);
  }, 0);
  const currentPrice = currencyFormatter(summCoins ?? 0);

  return {currentPrice};

}


//   const test = classicPrjCoin?.map(coin => ({
//   coinPrice: coin.coinPrice,
//   symbol: coin.symbol,
//   amount: amountCoins.find(item => item.symbol === coin.symbol)?.amount
// }));

// test?.reduce((accumulator, currentValue) => {
//   return accumulator + (currentValue.coinPrice * (currentValue.amount ?? 0));
// }, 0);