import { useAppContext } from '@/providers/AppProvider/AppProvider';
import { useWallet } from '@solana/wallet-adapter-react';
import { currencyIcons } from '@/lib/constants';

export const WalletButtonContent = () => {
  const { publicKey } = useWallet();
  const { balance } = useAppContext();

  const getButtonContent = () => {
    if (publicKey) {
      const base58 = publicKey.toBase58();
      return base58.slice(0, 5) + '...' + base58.slice(-5);
    }
    return 'CONNECT WALLET';
  };

  const ButtonContent = () => {
    return (
      <div
        className={`${publicKey ? 'bg-black px-3 py-1' : 'bg-inherit'} 
      rounded-md ${publicKey ? 'text-white' : 'text-card-foreground '} whitespace-nowrap`}
      >
        {getButtonContent()}
      </div>
    );
  };

  return (
    <div className='flex gap-4 text-sm font-semibold uppercase'>
      {publicKey ? (
        <>
          <ButtonContent />
          <div className='text-card-foreground font-roboto flex gap-1 items-center'>
            <img src={currencyIcons['SOL']} alt='Coin image' width={16} height={16} />
            <div>{balance ? (balance / 1e9).toFixed(3) : 0.0}</div>
          </div>
        </>
      ) : (
        <ButtonContent />
      )}
    </div>
  );
};
