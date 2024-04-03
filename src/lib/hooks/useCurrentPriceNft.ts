import { useProjectList } from "@/lib/api/hooks/useProjectList"
import { useSolanaProjectById } from "@/lib/api/hooks/useSolanaProjectById";

interface AmountCoinsType {
  symbol: string
  amount: number
}
interface UseCurrentPriceNftArgs {
  collection: string
  amountCoins: AmountCoinsType[]
}

export const useCurrentPriceNft = ({ collection, amountCoins }: UseCurrentPriceNftArgs) => {
  const { projectList } = useProjectList();
  const classicId = collection === 'Classic' ? projectList?.find(item => item.name === collection)?.id : undefined;
  const ecoSystemId = collection === 'Solana Ecosystem' ? projectList?.find(item => item.name === collection)?.id : undefined;
  const { projectById: classicPrjCoin } = useSolanaProjectById(classicId ?? null);
  const { projectById: ecoSystemPrjCoin } = useSolanaProjectById(ecoSystemId ?? null);

  const coinsToReduce = classicId ? classicPrjCoin : ecoSystemPrjCoin;

  const currentPrice = coinsToReduce?.reduce((accumulator, coin) => {
    const amount = amountCoins.find(item => item.symbol === coin.symbol)?.amount ?? 0;
    return accumulator + (coin.coinPrice * amount);
  }, 0);

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