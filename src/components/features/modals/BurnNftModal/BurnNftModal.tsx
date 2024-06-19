import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
// import { InfoCard } from '@/components/widgets/cards/InfoCard/InfoCard.tsx'
import { Button } from '@/components/ui/Button.tsx';
import { Loader2 } from 'lucide-react';
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider.tsx';
import { FeeCard } from '@/components/widgets/cards/FeeCard/FeeCard.tsx';
import { useWallet } from '@solana/wallet-adapter-react';
import { currencyFormatter, shortAddress } from '@/lib/utils';
import { addressClassicCollection } from '@/lib/blockchain/constant';
import { classicPotrfolioId, ecosystemPortfolioId } from '@/lib/blockchain/constant';
import { useBurn } from '@/lib/blockchain/hooks/useBurn';

export const BurnNftModal = () => {
  const { publicKey } = useWallet();
  const { nftPrice, nftTitle, collection } = useModalsContext();

  const { burn, isLoading } = useBurn();

  const portfolioId = +nftTitle.slice(nftTitle.indexOf('#') + 1);
  const collectionId = collection === addressClassicCollection ? classicPotrfolioId : ecosystemPortfolioId;

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
      <CardHeader className='px-6 pt-6 mb-0'>
        <CardTitle className={'text-xl font-bold'}>Burn nft</CardTitle>
      </CardHeader>
      <CardContent className={'flex flex-col gap-4 px-6 py-4'}>
        <p className={'text-sm'}>
          Please, confirm you’re going to burn <span className={'font-semibold'}>{nftTitle}</span>. This action cannot
          be undone.
        </p>
        <FeeCard data={tempData} />
      </CardContent>
      <CardFooter className={'gap-4 px-6 pb-4 pt-6 border border-border justify-end'}>
        <Button variant={'outline'} onClick={() => setModalName('')}>
          Cancel
        </Button>
        <Button variant={'accent'} onClick={() => burn({ collectionId, portfolioId })}>
          {isLoading && <Loader2 className='animate-spin mr-2' />}
          Confirm
        </Button>
      </CardFooter>
    </>
  );
};
