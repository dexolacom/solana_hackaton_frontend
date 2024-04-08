import logo from '@/assets/BISCUIT.svg'
import house from '@/assets/icons/house.svg'
import briefcase from '../../../assets/icons/briefCase.svg'
import { AppLink } from '@/components/common/AppLink/AppLink.tsx'
import { useLocation } from 'react-router-dom'
import { WalletButton } from '@/components/features/WalletButton/WalletButton'
import { WalletButtonContent } from '@/components/features/WalletButtonContent/WalletButtonContent'

export const Header = () => {
  const location = useLocation()

  return (
    <header className={'py-4 px-4 flex justify-center items-center'}>
      <div className='flex-1'>
        <img src={logo} />
      </div>
      <div className={'flex gap-10 '}>
        <AppLink variant={'ghost'} to={'/'} isActive={location?.pathname === '/'}>
          <img src={house} className={'-mt-[2px]'} />
          Home
        </AppLink>
        <AppLink variant={'ghost'} to={'/my-holdings'} isActive={location?.pathname === '/my-holdings'}>
          <img src={briefcase} className={'-mt-[2px]'} />
          My Holdings
        </AppLink>
      </div>
      <div className='flex-1 flex justify-end'>
        <WalletButton>
          <WalletButtonContent />
        </WalletButton>
      </div>
    </header>
  )
}
