import logo from '../assets/BISCUIT.svg'
import house from '../assets/icons/house.svg'
import briefcase from '../assets/icons/briefCase.svg'
import { Button } from '@/components/ui/button.tsx';
import { AppLink } from '@/components/link.tsx';
import { useLocation } from 'react-router-dom';


export const Header = () => {
  const location = useLocation()

  return (
    <header className={'py-4 px-10 flex items-center justify-between'}>
      <img src={logo}/>
      <span className={'flex gap-10'}>
        <AppLink to={'/'} isActive={location?.pathname === '/'}>
          <img src={house} className={'-mt-[2px]'}/>
          Home
        </AppLink>
        <AppLink to={'/my-holdings'} isActive={location?.pathname === '/my-holdings'}>
          <img src={briefcase} className={'-mt-[2px]'}/>
          My Holdings
        </AppLink>
      </span>
      <Button>Connect</Button>
    </header>
  )
}