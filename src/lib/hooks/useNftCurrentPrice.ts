import { useProjectList } from "@/lib/api/hooks/useProjectList"
import { useSolanaProjectById } from "@/lib/api/hooks/useSolanaProjectById";
import { CollectionType } from "../api/hooks/useSolanaRate";
import { useNftData } from "../blockchain/hooks/useNftData";
import { coins } from "../blockchain/constant";

interface UseCurrentPriceNftArgs {
  collection: CollectionType,
  title: string
}

export const useNftCurrentPrice = ({ collection, title }: UseCurrentPriceNftArgs) => {
  const {cards} = useNftData();
  console.log("🚀 ~ useNftCurrentPrice ~ cards:", cards?.['all'][0].content.tokensAmount)

  const nftId = title.slice(title.indexOf('#')+1);
  console.log("🚀 ~ useNftCurrentPrice ~ nftId:", nftId)
  const tokensAmount = cards?.['all']?.filter(card => card?.name?.replace(/\D/g, "") === nftId)?.[0]?.content?.tokensAmount;
  console.log("🚀 ~ useNftCurrentPrice ~ tokensAmount:", tokensAmount)
  

  const { projectList } = useProjectList();
  const classicId = collection === 'Classic' ? projectList?.find(item => item.name === collection)?.id : undefined;
  const ecoSystemId = collection === 'Solana Ecosystem' ? projectList?.find(item => item.name === collection)?.id : undefined;
  const { projectById: classicPrjCoin } = useSolanaProjectById(classicId ?? null);
  const { projectById: ecoSystemPrjCoin } = useSolanaProjectById(ecoSystemId ?? null);

  const newClassicProject = classicPrjCoin?.filter((item => ['BTC', 'ETH', 'SOL', 'JUP'].includes(item.symbol)))

  const coinsToReduce = (classicId ? newClassicProject : ecoSystemPrjCoin);
  const currentPrice = coinsToReduce?.reduce((accumulator, coin) => {
  const amount = tokensAmount?.[coin.symbol] ?? 0 ;
  const decimals = coins.find(item => item.currency === coin.symbol)?.decimals ?? 0;
    return accumulator + (coin.coinPrice * amount /decimals *10);
  }, 0);
   
  return {currentPrice};

}

