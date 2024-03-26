import { Skeleton } from '@/components/common/Skeleton/Skeleton'
import { columns } from '@/components/features/tabels/SolanaPageTable/lib/columns'
import { DataTable } from '@/components/widgets/DataTable/DataTable.tsx'
import { ecosystemTemplate } from '@/lib/constants'
import { useTableData } from '@/lib/hooks/useTableData'

export const SolanaItemTable = () => {
  const { dataTable, isLoading } = useTableData({template: ecosystemTemplate })

  return <div>{isLoading ? <Skeleton height={660} /> : <DataTable columns={columns} data={dataTable} />}</div>
}
