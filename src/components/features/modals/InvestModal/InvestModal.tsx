import { useNavigate } from "react-router-dom";
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card.tsx'
import { Button } from '@/components/ui/Button.tsx'
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider.tsx'
// import { ModalCurrency } from '@/components/common/ModalCurrency/ModalCurrency.tsx'

export const InvestModal = () => {
  const { setModalName, nftPrice } = useModalsContext()
  const navigate = useNavigate();

  return (
    <>
      <CardHeader>
        <CardTitle className={'text-2xl'}>Investment Successful</CardTitle>
      </CardHeader>
      <CardContent className={'flex flex-col gap-4'}>
        <p className={'text-sm'}>
          You have successfully invested <span className={'font-black'}>{nftPrice}</span> in{' '} NFT.
           {/* with following assets distribution: */}
          {/* <span className={'font-medium'}>Classical: #0001</span>  */}
        </p>
        {/* <ModalCurrency /> */}
      </CardContent>
      <CardFooter className={'gap-4 mt-6'}>
        <Button variant={'secondary'} className={'flex-1'} onClick={() => setModalName('')}>
          Close
        </Button>
        <Button variant={'accent'} className={'flex-1'} onClick={() => {navigate(`/my-holdings`); setModalName('')}}>
          Go to my holdings
        </Button>
      </CardFooter>
    </>
  )
}
