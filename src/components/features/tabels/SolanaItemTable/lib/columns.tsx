import info from '@/assets/icons/info.svg'
import { Badge } from '@/components/ui/Badge.tsx'
import { currencyIcons, currencyLinks } from '@/lib/constants.tsx'
import { ColumnDef } from '@tanstack/react-table'

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
            <a href={currencyLinks[title]}
              target="_blank"
              rel="noopener noreferrer"
              className={'font-medium underline underline-offset-2'}>
              {title}
            </a>
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
    accessorKey: 'currentCoinPrice',
    header: 'Current Coin Price',
  },
  {
    accessorKey: '24hChange',
    header: '24h Change',
  },
  {
    accessorKey: 'Earned',
    header: () => <div className='flex justify-end gap-[4px] items-center'>
      <div>Earned</div>
      <img src={info} alt="info icon" width={20} height={20} />
    </div>,
  },
]
