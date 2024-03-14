import { DataTable } from '@/components/widgets/DataTable/DataTable.tsx'
import { columns, TableData } from '@/components/features/tabels/ClassicPageTable/columns.tsx'

export const ClassicPageTable = () => {
  const data: TableData[] = [
    {
      token: {
        title: 'BTC',
        fullTitle: 'Bitcoin',
      },
      riskType: 'low',
      distribution: '30%',
    },
    {
      token: {
        title: 'SOL',
        fullTitle: 'Solana',
      },
      riskType: 'medium',
      distribution: '20%',
    },
    {
      token: {
        title: 'ETH',
        fullTitle: 'Ethereum',
      },
      riskType: 'high',
      distribution: '15%',
    },
    {
      token: {
        title: 'JUP',
        fullTitle: 'Jupiter',
      },
      riskType: 'medium',
      distribution: '10%',
    },
    {
      token: {
        title: 'RNDR',
        fullTitle: 'Render',
      },
      riskType: 'low',
      distribution: '10%',
    },
    {
      token: {
        title: 'HNT',
        fullTitle: 'Helium',
      },
      riskType: 'low',
      distribution: '5%',
    },
    {
      token: {
        title: 'BONK',
        fullTitle: 'Bonk',
      },
      riskType: 'medium',
      distribution: '5%',
    },
    {
      token: {
        title: 'PYTH',
        fullTitle: 'Pyth Network',
      },
      riskType: 'high',
      distribution: '5%',
    },
  ]

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
