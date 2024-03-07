import btc from '../../../assets/icons/btc.svg'

export const FormCurrency = () => {
  return (
    <div className={'flex items-center justify-between text-sm'}>
      <span className={'flex gap-2 '}>
        <img className={'-mt-[3px]'} src={btc}/>
        BTC
      </span>
      <span>$ 30</span>
    </div>
  )
}