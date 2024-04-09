import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card.tsx'
import defaultCard from '@/assets/defaultCard.png'
import { Button } from '@/components/ui/Button.tsx'
// import { ArrowUpDown } from 'lucide-react'
// import { Flame } from 'lucide-react'
import { useGetNftImg } from '@/lib/api/hooks/useGetNftImg'
import { CollectionType } from '@/lib/api/hooks/useSolanaRate'
import { currencyIcons } from '@/lib/constants.tsx'
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider.tsx'
import { Link } from 'react-router-dom'
import { useNftCurrentPrice } from '@/lib/hooks/useNftCurrentPrice'
import { addressClassicCollection } from '@/lib/blockchain/constant'
import { currencyFormatter } from '@/lib/utils'

interface NftCardProps {
  title: string
  uri: string
  collection: string
  investedPrice: number
  mint?: string
}

export const NftCard = (props: NftCardProps) => {

  const { title, uri, collection, investedPrice } = props
  const { img } = useGetNftImg(uri);
  const { setModalName, setCollection, setNftPrice, setNftTitle } = useModalsContext()

  // const classicIcons = ['BTC', 'SOL', 'ETH', 'JUP', 'RNDR', 'HNT', 'BONK', 'PYTH']
  // const solanaIcons = ['SOL', 'JUP', 'RNDR', 'HNT', 'BONK', 'PYTH', 'RAY', 'JTO', 'WIF']
  const classicIcons = ['BTC', 'SOL', 'ETH', 'JUP']
  const solanaIcons = ['SOL', 'JUP', 'RNDR', 'HNT']

  const currentCollection = collection === addressClassicCollection ? CollectionType.CLASSIC : CollectionType.ECOSYSTEM;

  const { currentPrice } = useNftCurrentPrice({ collection: currentCollection, title });

  return (
    <Card className={'relative'}>
      <Link
        to={`Classic/${encodeURIComponent(title)}?invested=${investedPrice ?? 0}&currentPrice=${currentPrice ?? 0}`}
        className={'z-10 absolute w-full h-full top-0 left-0'}
        onClick={(e) => {
          e.stopPropagation();
          setCollection(collection);
          setNftTitle(title);

        }} />
      <img
        src={img || defaultCard}
        width={312}
        height={312}
        alt={'Portfolio image'}
        style={{ width: 'calc(100% + 48px)', maxWidth: 'none' }}
        className={'rounded-md mb-6 -ml-[24px] -mt-[24px] rounded-b-none'}
      />

      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={'flex items-center gap-2 mb-4'}>
          {currentCollection === CollectionType.CLASSIC
            ? classicIcons.map((icon) => <img key={icon} className={'h-6 w-6 -mt-[3px]'} src={currencyIcons[icon]} />)
            : solanaIcons.map((icon) => <img key={icon} className={'h-6 w-6 -mt-[3px]'} src={currencyIcons[icon]} />)}
        </div>
        <div className={'flex items-center justify-between'}>
          <span className={'font-regular text-sm text-card-additionalForeground'}>Invested</span>
          <span className={'font-roboto text-sm font-medium'}>{currencyFormatter(investedPrice ?? 0)}</span>
        </div>
        <div className={'flex items-center justify-between'}>
          <span className={'font-regular text-sm text-card-additionalForeground'}>Current Price</span>
          <span className={'font-roboto text-sm font-medium'}>{currencyFormatter(currentPrice ?? 0)}</span>
        </div>
      </CardContent>
      <CardFooter className={'flex gap-4 pt-6 relative z-20'}>
        <Button className={'flex-1 gap-2'} variant={'accent'}
          onClick={() => {
            setModalName('TRANSFER_NFT');
            setCollection(collection);
            setNftTitle(title)
          }}>
          {/* <ArrowUpDown className={'w-4 h-4'} /> */}
          Transfer
        </Button>
        <Button className={'flex-1 gap-2'} variant={'destructive'}
          onClick={() => {
            setModalName('BURN_NFT');
            setNftPrice(currentPrice ? currentPrice.toString() : '0')
            setNftTitle(title)
            setCollection(collection)
          }}
        >
          {/* <Flame className={'w-4 h-4'} /> */}
          Burn
        </Button>
      </CardFooter>
    </Card >
  )
}