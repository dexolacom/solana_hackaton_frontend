import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
// import { InfoCard } from '@/components/widgets/cards/InfoCard/InfoCard.tsx'
import { Button } from '@/components/ui/Button.tsx';
import { Loader2 } from 'lucide-react';
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider.tsx';
import { InfoCard } from '@/components/widgets/cards/InfoCard/InfoCard.tsx';
import { useWallet } from '@solana/wallet-adapter-react';
import { currencyFormatter, shortAddress } from '@/lib/utils';
import { useBurnPortfolio } from '@/lib/blockchain/hooks/useBurnPortfolio';
import { addressClassicCollection } from '@/lib/blockchain/constant';
import { classicPotrfolioId, ecosystemPortfolioId } from '@/lib/blockchain/constant';

export const BurnNftModal = () => {
  const { publicKey } = useWallet();
  const { nftPrice, nftTitle, collection } = useModalsContext();
  const { burn, isLoading } = useBurnPortfolio();

  const nftId = +nftTitle.slice(nftTitle.indexOf('#') + 1);
  const portfolioId = collection === addressClassicCollection ? classicPotrfolioId : ecosystemPortfolioId;

  const nftPriceToNumber = +nftPrice;
  const fee = nftPriceToNumber * 0.005;
  const get = nftPriceToNumber - fee;

  const tempData = [
    {
      title: 'Current NFT Price',
      value: currencyFormatter(nftPriceToNumber)
    },
    {
      title: 'Transaction Fee, 0.5%',
      value: currencyFormatter(fee)
    },
    {
      title: 'You will get',
      value: currencyFormatter(get)
    },
    {
      title: 'Wallet Address',
      value: shortAddress(publicKey)
    }
  ];

  const { setModalName } = useModalsContext();

  return (
    <>
      <CardHeader>
        <CardTitle className={'text-2xl'}>Burn nft</CardTitle>
      </CardHeader>
      <CardContent className={'flex flex-col gap-4'}>
        <p className={'text-sm'}>
          Please, confirm you’re going to burn <span className={'font-black'}>{nftTitle}</span>. This action cannot be
          undone.
        </p>
        <InfoCard data={tempData} />
      </CardContent>
      <CardFooter className={'gap-4 mt-6'}>
        <Button variant={'secondary'} className={'flex-1'} onClick={() => setModalName('')}>
          Cancel
        </Button>
        <Button variant={'accent'} className={'flex-1'} onClick={() => burn({ portfolioId, nftId })}>
          {isLoading && <Loader2 className='animate-spin mr-2' />}
          Confirm
        </Button>
      </CardFooter>
    </>
  );
};
