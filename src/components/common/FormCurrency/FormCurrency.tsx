import btc from '../../../assets/icons/currency/btc.svg'
import eth from '../../../assets/icons/currency/eth.svg'
import sol from '../../../assets/icons/currency/sol.svg'
import jup from '../../../assets/icons/currency/jup.svg'
import rndr from '../../../assets/icons/currency/rndr.svg'
import hnt from '../../../assets/icons/currency/hnt.svg'
import bonk from '../../../assets/icons/currency/bonk.svg'
import pyth from '../../../assets/icons/currency/pyth.svg'


export const FormCurrency = () => {
  const tempData = [
    {
      title: 'BTC',
      number: 30
    },
    {
      title: 'ETH',
      number: 30
    },
    {
      title: 'SOL',
      number: 30
    },
    {
      title: 'JUP',
      number: 30
    },
    {
      title: 'RNDR',
      number: 30
    },
    {
      title: 'HNT',
      number: 30
    },
    {
      title: 'BONK',
      number: 30
    },
    {
      title: 'PYTH',
      number: 30
    }
  ]

  const imgs: Record<string, string> = {
    BTC: btc,
    ETH: eth,
    SOL: sol,
    JUP: jup,
    RNDR: rndr,
    HNT: hnt,
    BONK: bonk,
    PYTH: pyth
  }

  return (
    <div className={'flex gap-10'}>
      <div className={'flex flex-col gap-2 flex-1'}>
        {tempData.slice(0, 4).map((item) => (
          <div key={item.title} className={'flex items-center justify-between text-sm'}>
            <span className={'flex gap-2'}>
              <img className={'h-6 w-6 -mt-[3px]'} src={imgs[item.title]}/>
              {item.title}
            </span>
            <span>$ {item.number}</span>
          </div>
        ))}
      </div>

      <div className={'flex flex-col gap-2 flex-1'}>
        {tempData.slice(4, tempData.length).map((item) => (
          <div key={item.title} className={'flex items-center justify-between text-sm'}>
            <span className={'flex gap-2'}>
              <img className={'h-6 w-6 -mt-[3px]'} src={imgs[item.title]}/>
              {item.title}
            </span>
            <span>$ {item.number}</span>
          </div>
        ))}
      </div>
    </div>
  )
}