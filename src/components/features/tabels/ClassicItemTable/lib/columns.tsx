// import info from '@/assets/icons/info.svg'
import { Badge } from '@/components/ui/Badge.tsx';
import { currencyLinks } from '@/lib/constants.tsx';
import { ColumnDef } from '@tanstack/react-table';

export type TableData = {
  symbol: string;
  icon: string;
  distribution: string;
  name: string;
  riskType: 'Low' | 'Medium' | 'High';
  coinPrice: string;
  change24h: string;
  marketCap: string;
};

export const columns: ColumnDef<TableData>[] = [
  {
    accessorKey: 'token',
    header: () => <div className='text-left'>Token</div>,
    cell: ({ row }) => {
      const { icon, symbol, name } = row.original;
      return (
        <div className={'flex gap-2 text-left items-center'}>
          <img className={'h-6 w-6'} src={icon} alt='Coin icon' />
          <div className={'flex flex-col'}>
            <a
              href={currencyLinks[symbol]}
              target='_blank'
              rel='noopener noreferrer'
              className={'font-medium underline underline-offset-2'}
            >
              {symbol}
            </a>
            <span className={'text-xs text-card-additionalForeground'}>{name}</span>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: 'riskType',
    header: 'Risk Type',
    cell: ({ row }) => {
      const { riskType } = row.original;
      return <Badge variant={riskType}>{riskType}</Badge>;
    }
  },
  {
    accessorKey: 'coinAmount',
    header: 'Coin Amount'
  },
  {
    accessorKey: 'coinPrice',
    header: 'Current Coin Price',
    cell: ({ row }) => {
      const { change24h, coinPrice } = row.original;
      return <div className={+change24h.slice(0, -1) > 0 ? 'text-lime-600' : "text-red-500" }>{coinPrice}</div>
    }
  },
  {
    accessorKey: 'change24h',
    header: '24h Change',
    cell: ({ row }) => {
      const { change24h } = row.original;
      return <div className={+change24h.slice(0, -1) > 0 ? 'text-lime-600' : "text-red-500" }>{change24h}</div>
    }
  }
  // {
  //   accessorKey: 'Earned',
  //   header: () => <div className='flex justify-end gap-[4px] items-center'>
  //     <div>Earned</div>
  //     <img src={info} alt="info icon" width={20} height={20} />
  //   </div>,
  // },
];
