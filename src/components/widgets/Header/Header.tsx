import logo from '@/assets/BISCUIT.svg';
import house from '@/assets/icons/house.svg';
import briefcase from '../../../assets/icons/briefCase.svg';
import briefcaseGray from '../../../assets/icons/briefCaseGray.svg';
import { AppLink } from '@/components/common/AppLink/AppLink.tsx';
import { useLocation } from 'react-router-dom';
import { WalletButton } from '@/components/features/WalletButton/WalletButton';
import { WalletButtonContent } from '@/components/features/WalletButtonContent/WalletButtonContent';
import { useWallet } from '@solana/wallet-adapter-react';

export const Header = () => {
  const location = useLocation();
  const { publicKey } = useWallet();
  return (
    <header className={'py-4 px-20 flex justify-center items-center'}>
      <div className='flex-1'>
        <img src={logo} />
      </div>
      <div className={'flex gap-4 '}>
        <AppLink variant={'ghost'} to={'/'} isActive={location?.pathname === '/'}>
          <img src={house} alt='House' className={'-mt-[2px]'} />
          Home
        </AppLink>
        <AppLink
          variant={publicKey ? 'ghost' : 'disabled'}
          to={'/my-holdings'}
          isActive={location?.pathname === '/my-holdings'}
        >
          <img src={publicKey ? briefcase : briefcaseGray} alt='briefcase' className={'-mt-[2px]'} />
          My Holdings
        </AppLink>
      </div>
      <div className='flex-1 flex justify-end'>
        <WalletButton>
          <WalletButtonContent />
        </WalletButton>
      </div>
    </header>
  );
};
