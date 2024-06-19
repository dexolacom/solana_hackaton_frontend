import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import defaultCard from '@/assets/images/defaultCard.png';
import { Button } from '@/components/ui/Button.tsx';
// import { ArrowUpDown } from 'lucide-react'
// import { Flame } from 'lucide-react'
import { useGetNftImg } from '@/lib/api/hooks/useGetNftImg';
import { CollectionType } from '@/lib/api/hooks/useSolanaRate';
import { currencyIcons } from '@/lib/constants.tsx';
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider.tsx';
import { Link } from 'react-router-dom';
import { useNftCurrentPrice } from '@/lib/hooks/useNftCurrentPrice';
import { addressClassicCollection } from '@/lib/blockchain/constant';
import { currencyFormatter } from '@/lib/utils';

interface NftCardProps {
  title: string;
  uri: string;
  collection: string;
  investedPrice: number;
  mint?: string;
}

export const NftCard = (props: NftCardProps) => {
  const { title, uri, collection, investedPrice } = props;
  const { img } = useGetNftImg(uri);
  const { setModalName, setCollection, setNftPrice, setNftTitle } = useModalsContext();

  const classicIcons = ['BTC', 'SOL', 'ETH', 'JUP', 'RNDR', 'HNT', 'BONK', 'PYTH'];
  const solanaIcons = ['SOL', 'JUP', 'RNDR', 'HNT', 'BONK', 'PYTH', 'RAY', 'JTO', 'WIF'];
  // const classicIcons = ['BTC', 'SOL', 'ETH', 'JUP']
  // const solanaIcons = ['SOL', 'JUP', 'RNDR', 'HNT']

  const currentCollection = collection === addressClassicCollection ? CollectionType.CLASSIC : CollectionType.ECOSYSTEM;

  const { currentPrice } = useNftCurrentPrice({ collection: currentCollection, title });

  return (
    <Card className={'relative shadow-sm p-0'}>
      <Link
        to={`${collection === addressClassicCollection ? 'classic' : 'solana'}/${encodeURIComponent(title)}?invested=${investedPrice ?? 0}&currentPrice=${currentPrice ?? 0}`}
        className={'z-10 absolute w-full h-full top-0 left-0'}
        onClick={(e) => {
          e.stopPropagation();
          setCollection(collection);
          setNftTitle(title);
        }}
      />
      <img
        src={img || defaultCard}
        width={312}
        height={312}
        alt={'Portfolio image'}
        style={{ width: '100%', maxWidth: 'none' }}
        className={'rounded-md rounded-b-none'}
      />
      <div className='px-4 p-6 flex flex-col gap-4'>
        <CardHeader className='rounded-lg mb-0'>
          <CardTitle className='text-base font-bold normal-case'>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={'flex items-center gap-2 mb-4'}>
            {currentCollection === CollectionType.CLASSIC
              ? classicIcons.map((icon) => <img key={icon} className={'h-6 w-6'} src={currencyIcons[icon]} />)
              : solanaIcons.map((icon) => <img key={icon} className={'h-6 w-6'} src={currencyIcons[icon]} />)}
          </div>
          <div className='flex font-medium text-sm'>
            <div className={'flex flex-col flex-1 gap-1'}>
              <span className={'font-regular text-muted-foreground'}>Invested</span>
              <span className={'font-roboto'}>{currencyFormatter(investedPrice ?? 0)}</span>
            </div>
            <div className={'flex flex-col flex-1 gap-1'}>
              <span className={'font-regular text-muted-foreground'}>Current Price</span>
              <span className={'font-roboto'}>{currencyFormatter(currentPrice ?? 0)}</span>
            </div>
          </div>
        </CardContent>
      </div>
      <CardFooter className={'flex gap-4 p-4 relative z-20 border-t border-border'}>
        <Button
          className={'flex-1 gap-2'}
          variant={'outline'}
          onClick={() => {
            setModalName('TRANSFER_NFT');
            setCollection(collection);
            setNftTitle(title);
          }}
        >
          {/* <ArrowUpDown className={'w-4 h-4'} /> */}
          Transfer
        </Button>
        <Button
          className={'flex-1 gap-2'}
          variant={'accent'}
          onClick={() => {
            setModalName('BURN_NFT');
            //@ts-ignore
            setNftPrice(currentPrice ? currentPrice?.toString() : '0');
            setNftTitle(title);
            setCollection(collection);
          }}
        >
          {/* <Flame className={'w-4 h-4'} /> */}
          Burn
        </Button>
      </CardFooter>
    </Card>
  );
};
