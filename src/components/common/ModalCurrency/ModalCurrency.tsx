import btc from '@/assets/icons/currency/btc.svg';

export const ModalCurrency = () => {
  return (
    <div className={'flex items-center gap-2 text-sm'}>
      <img className={'-mt-[2px]'} src={btc} />
      0.00053 BTC
    </div>
  );
};
