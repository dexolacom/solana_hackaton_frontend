import { columns, TableData } from './columns.tsx'
import { DataTable } from '@/components/widgets/DataTable/DataTable.tsx'

export const ClassicItemTable = () => {
  const data: TableData[] = [
    {
      token: {
        title: 'BTC',
        fullTitle: 'Bitcoin',
      },
      riskType: 'Low',
    },
    {
      token: {
        title: 'SOL',
        fullTitle: 'Solana',
      },
      riskType: 'Medium',
    },
    {
      token: {
        title: 'ETH',
        fullTitle: 'Ethereum',
      },
      riskType: 'High',
    },
    {
      token: {
        title: 'JUP',
        fullTitle: 'Jupiter',
      },
      riskType: 'Medium',
    },
    {
      token: {
        title: 'RNDR',
        fullTitle: 'Render',
      },
      riskType: 'Low',
    },
    {
      token: {
        title: 'HNT',
        fullTitle: 'Helium',
      },
      riskType: 'Low',
    },
    {
      token: {
        title: 'BONK',
        fullTitle: 'Bonk',
      },
      riskType: 'Medium',
    },
    {
      token: {
        title: 'PYTH',
        fullTitle: 'Pyth Network',
      },
      riskType: 'High',
    },
  ]

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
