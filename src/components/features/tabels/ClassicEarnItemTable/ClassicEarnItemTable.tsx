import { columns, TableData } from './columns.tsx';
import { DataTable } from '@/components/widgets/DataTable/DataTable.tsx';


export const ClassicEarnItemTable = () => {
  const data: TableData[] = [
    {
      token: {
        title: 'BTC',
        fullTitle: 'Bitcoin'
      },
      riskType: 'low',
    },
    {
      token: {
        title: 'SOL',
        fullTitle: 'Solana'
      },
      riskType: 'medium',
    },
    {
      token: {
        title: 'ETH',
        fullTitle: 'Ethereum'
      },
      riskType: 'high',
    },
    {
      token: {
        title: 'JUP',
        fullTitle: 'Jupiter'
      },
      riskType: 'medium',
    },
    {
      token: {
        title: 'RNDR',
        fullTitle: 'Render'
      },
      riskType: 'low',
    },
    {
      token: {
        title: 'HNT',
        fullTitle: 'Helium'
      },
      riskType: 'low'
    },
    {
      token: {
        title: 'BONK',
        fullTitle: 'Bonk'
      },
      riskType: 'medium'
    },
    {
      token: {
        title: 'PYTH',
        fullTitle: 'Pyth Network'
      },
      riskType: 'high'
    }
  ]

  return (
    <div>
      <DataTable columns={columns} data={data}/>
    </div>
  )
}