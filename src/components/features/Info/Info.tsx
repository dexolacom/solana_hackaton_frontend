import { InfoCard } from '@/components/common/InfoCard/InfoCard';
import { dataInfo } from './lib/dataInfo';

export const Info = () => {
  return (
    <section className='mb-[120px]'>
      <h2 className='text-8xl uppercase font-semibold text-center mb-20'>How it Works</h2>
      <div className='flex gap-10'>
        {dataInfo.map(({ cardNumber, titlePartOne, titlePartTwo, titleAccent, image }) => (
          <InfoCard
            key={cardNumber}
            cardNumber={cardNumber}
            titleAccent={titleAccent}
            titlePartOne={titlePartOne}
            titlePartTwo={titlePartTwo}
            image={image}
          />
        ))}
      </div>
    </section>
  );
};
