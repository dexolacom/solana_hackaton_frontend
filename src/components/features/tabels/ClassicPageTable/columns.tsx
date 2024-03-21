import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/Badge.tsx'

export type TableData = {
  symbol: string
  icon: string
  distribution: string
  name: string
  riskType: 'Low' | 'Medium' | 'High'
  coinmarketcapId: number
}

export const columns: ColumnDef<TableData>[] = [
  {
    accessorKey: 'token',
    header: () => <div className='text-left'>Token</div>,
    cell: ({ row }) => {
      const { icon, symbol, name } = row.original
      return (
        <div className={'flex gap-2 text-left items-center'}>
          <img className={'h-6 w-6'} src={icon} alt='Coin icon' />
          <div className={'flex flex-col'}>
            <span className={'font-medium'}>{symbol}</span>
            <span className={'text-xs text-card-additionalForeground'}>{name}</span>
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
    accessorKey: 'distribution',
    header: 'Distribution',
  },
  {
    accessorKey: 'coinPrice',
    header: 'Coin Price',
  },
  {
    accessorKey: '24hChange',
    header: '24h Change',
  },
  {
    accessorKey: 'marketCap',
    header: () => <div className='text-right'>Market Cup</div>,
  },
]
