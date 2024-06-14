import { ReactNode } from 'react';

interface InfoCardProps {
  cardNumber: string;
  titleAccent: string;
  titlePartOne: string;
  titlePartTwo: string;
  image: ReactNode;
}

export const InfoCard = ({ cardNumber, titlePartOne, titlePartTwo, titleAccent, image }: InfoCardProps) => {
  return (
    <div className='relative overflow-hidden flex flex-col justify-between px-6 py-10 h-[600px] flex-1 rounded-xl bg-white shadow-[0px_2px_8px_2px_rgba(0,0,0,0.04)]'>
      {image}
      <h3 className='font-roboto text-8xl text-black/[.24] font-bold'>{cardNumber}</h3>
      <h4 className='text-[64px] uppercase'>
        <div className='font-bold text-accent'>{titleAccent}</div>
        <div className='font-semibold'>{titlePartOne}</div>
        <div className='font-semibold'>{titlePartTwo}</div>
      </h4>
    </div>
  );
};
