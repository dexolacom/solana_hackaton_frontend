import { useAppContext } from '@/providers/AppProvider/AppProvider';
import { useWallet } from '@solana/wallet-adapter-react'

export const WalletButtonContent = () => {

  const { publicKey } = useWallet();
  const { balance } = useAppContext();

  const getButtonContent = () => {
    if (publicKey) {
      const base58 = publicKey.toBase58();
      return base58.slice(0, 5) + '...' + base58.slice(-5);
    }
    return 'Connect Wallet';
  }

  const ButtonContent = () => {
    return <div
      className={`px-3 py-1 ${publicKey ? 'bg-actions' : 'bg-inherit'} 
      rounded-xl ${publicKey ? 'text-white' : 'text-card-foreground '}`}
    >
      {getButtonContent()}
    </div>
  }

  return (
    <div className='flex gap-3 text-sm'>
      {publicKey ?
        <>
          <ButtonContent />
          <div className='px-3 py-1 text-card-foreground font-roboto'>
            {balance ? (balance / 1000000000).toFixed(3) : 0.000}
          </div>
        </> : <ButtonContent />
      }
    </div>
  )
}