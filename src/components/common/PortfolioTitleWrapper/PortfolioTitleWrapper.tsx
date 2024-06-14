import { ReactNode } from 'react';

export const PortfolioTitleWrapper = ({ children, image }: { children: ReactNode; image: string }) => {
  return (
    <div
      className={`p-6 bg-cover flex-1 flex flex-col justify-between rounded-xl shadow-sm`}
      style={{ backgroundImage: `url('${image}')` }}
    >
      {children}
    </div>
  );
};
