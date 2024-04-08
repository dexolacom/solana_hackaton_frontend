import { ColumnDef } from '@tanstack/react-table'
import { currencyIcons } from '@/lib/constants.tsx'
import { Badge } from '@/components/ui/Badge.tsx'

export type TableData = {
  token: {
    title: string
    fullTitle: string
  }
  riskType: 'Low' | 'Medium' | 'High'
}

export const columns: ColumnDef<TableData>[] = [
  {
    accessorKey: 'token',
    header: () => <div className='text-left'>Token</div>,
    cell: ({ row }) => {
      const { title, fullTitle } = row.original.token
      return (
        <div className={'flex gap-2 text-left items-center'}>
          <img className={'h-6 w-6'} src={currencyIcons[title]} alt='' />
          <div className={'flex flex-col'}>
            <span className={'font-medium'}>{title}</span>
            <span className={'text-xs text-card-additionalForeground'}>{fullTitle}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'riskType',
    header: 'Risk Type',
    cell: ({ row }) => {
      const { riskType } = row.original
      return <Badge variant={riskType}>{riskType}</Badge>
    },
  },
  {
    accessorKey: 'coinAmount',
    header: 'Coin Amount',
  },
  {
    accessorKey: 'apr',
    header: 'APR',
  },
  {
    accessorKey: 'apy',
    header: 'APY',
  },
  {
    accessorKey: 'reward',
    header: 'Reward',
  },
  {
    accessorKey: 'currentCoinPrice',
    header: 'Current Coin Price',
  },
  {
    accessorKey: '24hChange',
    header: '24h Change',
  },
  {
    accessorKey: 'Earned',
    header: () => <div className='text-right'>Earned</div>,
  },
]
