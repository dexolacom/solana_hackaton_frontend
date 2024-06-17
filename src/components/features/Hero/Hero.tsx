import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import solana from '@/assets/icons/solana.svg';

interface HeroProps {
  scrollToPortfolios: () => void;
}

export const Hero = ({ scrollToPortfolios }: HeroProps) => {
  return (
    <section className="relative overflow-hidden w-full px-[80px] pt-[224px] pb-[80px] bg-[url('@/assets/heroBackground.svg')] bg-cover rounded-3xl mb-[120px] shadow-m mt-20">
      <div className='flex items-center gap-4 absolute top-[65px] left-[-40px] h-[58px] w-[395px] border-2 border-white rounded-[50px] pl-[80px]'>
        <span className='text-2xl text-white uppercase font-semibold'>Built on</span>
        <img src={solana} alt='Solana' />
      </div>
      <h1 className='text-7xl uppercase mb-10 1920:text-8xl'>
        <div className='font-semibold'>Decentralized</div>
        <div className='font-extrabold bg-white inline-block'>Investment platform</div>
      </h1>
      <p className='font-medium text-[2rem] leading-9 text-white mb-[140px]'>
        Invest in your first financial NFT portfolio in just a few clicks
      </p>
      <Button variant={'accent'} size={'lg'} onClick={() => scrollToPortfolios()}>
        Details & Invest
        <ArrowRight className={'w-6 h-6 ml-2'} />
      </Button>
    </section>
  );
};
