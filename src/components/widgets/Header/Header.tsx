import logo from '@/assets/BISCUIT.svg';
import house from '@/assets/icons/house.svg';
import briefcase from '../../../assets/icons/briefCase.svg';
import briefcaseGray from '../../../assets/icons/briefCaseGray.svg';
import { AppLink } from '@/components/common/AppLink/AppLink.tsx';
import { useLocation } from 'react-router-dom';
import { WalletButton } from '@/components/features/WalletButton/WalletButton';
import { WalletButtonContent } from '@/components/features/WalletButtonContent/WalletButtonContent';
import { useWallet } from '@solana/wallet-adapter-react';
import faucet from '@/assets/icons/faucet.svg';
import { Button } from '@/components/ui/Button';
import { useFaucet } from '@/lib/api/hooks/useFaucet';
import { Loader2 } from 'lucide-react';

export const Header = () => {
  const location = useLocation();
  const { publicKey } = useWallet();
  const { airDrop, isLoading } = useFaucet();

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
      <div className='flex-1 flex justify-end gap-3'>
        {publicKey && (
          <Button
            variant='outline'
            className='flex gap-4 font-mono font-semibold'
            onClick={() => (publicKey ? airDrop(publicKey.toString()) : {})}
          >
            {isLoading ? (
              <Loader2 size={32} className='animate-spin' />
            ) : (
              <img src={faucet} alt='Faucet' width={32} height={32} className='block' />
            )}
            <span>USDC</span>
          </Button>
        )}
        <WalletButton>
          <WalletButtonContent />
        </WalletButton>
      </div>
    </header>
  );
};
