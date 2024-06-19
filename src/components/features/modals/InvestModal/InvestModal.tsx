import { useNavigate } from 'react-router-dom';
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { Button } from '@/components/ui/Button.tsx';
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider.tsx';
// import { ModalCurrency } from '@/components/common/ModalCurrency/ModalCurrency.tsx'

export const InvestModal = () => {
  const { setModalName, nftPrice } = useModalsContext();
  const navigate = useNavigate();

  return (
    <>
      <CardHeader className='px-6 pt-6 pb-4 mb-0'>
        <CardTitle className={'text-xl font-bold'}>Investment Successful</CardTitle>
      </CardHeader>
      <CardContent className={'flex flex-col gap-4 px-6 py-4'}>
        <p className={'text-base'}>
          You have successfully invested <span className={'font-black font-roboto'}>{nftPrice}</span>{' '}
          <span className='font-bold'>USDC</span> in the portfolio.
          {/* with following assets distribution: */}
          {/* <span className={'font-medium'}>Classical: #0001</span>  */}
        </p>
        {/* <ModalCurrency /> */}
      </CardContent>
      <CardFooter className={'gap-4 px-6 pb-4 pt-6 border border-border justify-end'}>
        <Button variant={'outline'} onClick={() => setModalName('')}>
          Close
        </Button>
        <Button
          variant={'accent'}
          onClick={() => {
            navigate(`/my-holdings`);
            setModalName('');
          }}
        >
          Go to my holdings
        </Button>
      </CardFooter>
    </>
  );
};
