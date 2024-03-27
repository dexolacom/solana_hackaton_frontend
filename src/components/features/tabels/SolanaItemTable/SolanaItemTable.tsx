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
    {
      token: {
        title: 'RAY',
        fullTitle: 'Raydium',
      },
      riskType: 'High',
    },

    {
      token: {
        title: 'JTO',
        fullTitle: 'Jito',
      },
      riskType: 'High',
    },

    {
      token: {
        title: 'WIF',
        fullTitle: 'dogwifhat',
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
