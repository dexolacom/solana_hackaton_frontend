import { useProjectList } from '@/lib/api/hooks/useProjectList';
import { useSolanaProjectById } from '@/lib/api/hooks/useSolanaProjectById';
import { useSearchParams } from 'react-router-dom';
import { useNftData } from '../blockchain/hooks/useNftData';
import { OperationType, decimalsOperations } from '../helpers/decimalsOperations';
import { addressClassicCollection } from '../blockchain/constant';


export const useCurrentTotalPrice = () => {
  const { cards, isLoading } = useNftData();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter') ?? ''
  const tokensAmount = cards?.[filter]
  console.log("🚀 ~ useCurrentTotalPrice ~ tokensAmount:", tokensAmount)
  
  const { projectList } = useProjectList();
  const classicId =  projectList?.find((item) => item.name === 'Classic')?.id;
  const ecoSystemId = projectList?.find((item) => item.name === 'Solana Ecosystem')?.id;

  const { projectById: classicPrjCoin } = useSolanaProjectById(classicId ?? null);
  const { projectById: ecoSystemPrjCoin } = useSolanaProjectById(ecoSystemId ?? null);
  
  const totalPrice = tokensAmount?.reduce((accumulator, token) => {
    const collection = token.collection.key.toString();
    const coinsToReduce = collection === addressClassicCollection ? classicPrjCoin : ecoSystemPrjCoin;
    return accumulator + coinsToReduce?.reduce((acc, coin) => {
      const amount = token?.content?.coinAmounts?.[coin.symbol]?.uiAmount ?? 0;
      const countCoins = decimalsOperations(coin.coinPrice, amount, OperationType.MUL);
      return acc + countCoins;
    },0)
  }, 0);

  return { totalPrice, isLoading };
};
