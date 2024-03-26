import { DataTable } from '@/components/widgets/DataTable/DataTable.tsx'
import { columns, TableData } from '@/components/features/tabels/SolanaItemTable/lib/columns'

export const SolanaItemTable = () => {
  const data: TableData[] = [
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
        title: 'JUP',
        fullTitle: 'Jupiter',
      },
      riskType: 'Medium',
      distribution: '15%',
    },
    {
      token: {
        title: 'RNDR',
        fullTitle: 'Render',
      },
      riskType: 'Low',
      distribution: '15%',
    },
    {
      token: {
        title: 'HNT',
        fullTitle: 'Helium',
      },
      riskType: 'Low',
      distribution: '15%',
    },
    {
      token: {
        title: 'BONK',
        fullTitle: 'Bonk',
      },
      riskType: 'Medium',
      distribution: '10%',
    },
    {
      token: {
        title: 'PYTH',
        fullTitle: 'Pyth Network',
      },
      riskType: 'High',
      distribution: '5%',
    },
    {
      token: {
        title: 'RAY',
        fullTitle: 'Raydium',
      },
      riskType: 'High',
      distribution: '5%',
    },

    {
      token: {
        title: 'JTO',
        fullTitle: 'Jito',
      },
      riskType: 'High',
      distribution: '5%',
    },

    {
      token: {
        title: 'WIF',
        fullTitle: 'dogwifhat',
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
