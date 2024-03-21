import { DataTable } from '@/components/widgets/DataTable/DataTable.tsx'
import { columns } from './columns.tsx'

 type TableData = {
  token: {
    title: string
    fullTitle: string
  }
  riskType: 'Low' | 'Medium' | 'High'
  distribution: string
}

export const ClassicEarnPageTable = () => {
  const data: TableData[] = [
    {
      token: {
        title: 'BTC',
        fullTitle: 'Bitcoin',
      },
      riskType: 'Low',
      distribution: '30%',
    },
    {
      token: {
        title: 'SOL',
        fullTitle: 'Solana',
      },
      riskType: 'Medium',
      distribution: '20%',
    },
    {
      token: {
        title: 'ETH',
        fullTitle: 'Ethereum',
      },
      riskType: 'High',
      distribution: '15%',
    },
    {
      token: {
        title: 'JUP',
        fullTitle: 'Jupiter',
      },
      riskType: 'Medium',
      distribution: '10%',
    },
    {
      token: {
        title: 'RNDR',
        fullTitle: 'Render',
      },
      riskType: 'Low',
      distribution: '10%',
    },
    {
      token: {
        title: 'HNT',
        fullTitle: 'Helium',
      },
      riskType: 'Low',
      distribution: '5%',
    },
    {
      token: {
        title: 'BONK',
        fullTitle: 'Bonk',
      },
      riskType: 'Medium',
      distribution: '5%',
    },
    {
      token: {
        title: 'PYTH',
        fullTitle: 'Pyth Network',
      },
      riskType: 'High',
      distribution: '5%',
    },
  ]

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
