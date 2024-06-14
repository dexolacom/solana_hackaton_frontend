import { HomeCardsContainer } from '@/components/common/HomeCardsContainer/HomeCardsContainer.tsx';
import { Hero } from '@/components/features/Hero/Hero';
import { Info } from '@/components/features/Info/Info';
import { useRef } from 'react';

export const HomePage = () => {
  const portfoliosRef = useRef<HTMLDivElement>(null);

  const scrollToPortfolios = () => {
    if (portfoliosRef.current) {
      portfoliosRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      <Hero scrollToPortfolios={scrollToPortfolios} />
      <Info />
      <HomeCardsContainer ref={portfoliosRef} />
    </>
  );
};
