import decorationFirsCard from '@/assets/images/decoration_01.png';
import decorationSecondCard from '@/assets/images/decoration_02.png';
import decorationThirdCard from '@/assets/images/decoration_03.png';

export const dataInfo = [
  {
    cardNumber: '01_',
    titleAccent: 'Choose',
    titlePartOne: 'portfolio',
    titlePartTwo: 'to invest in',
    image: (
      <img src={decorationFirsCard} alt='Decoration' className='absolute top-0 right-0 ' width={363} height={363} />
    )
  },
  {
    cardNumber: '02_',
    titleAccent: 'Specify',
    titlePartOne: 'investment',
    titlePartTwo: 'amount',
    image: (
      <img src={decorationSecondCard} alt='Decoration' className='absolute top-0 right-0 ' width={278} height={278} />
    )
  },
  {
    cardNumber: '03_',
    titleAccent: 'Mint',
    titlePartOne: 'a unique',
    titlePartTwo: 'NFT',
    image: (
      <img src={decorationThirdCard} alt='Decoration' className='absolute top-0 right-0 ' width={278} height={278} />
    )
  }
];
