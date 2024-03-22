import { Skeleton } from '@/components/common/Skeleton/Skeleton'
import { columns } from '@/components/features/tabels/SolanaPageTable/lib/columns'
import { DataTable } from '@/components/widgets/DataTable/DataTable.tsx'
import { ecosystemTemplate } from '@/lib/constants'
import { useTableData } from '@/lib/hooks/useTableData'
import { useAppContext } from '@/providers/AppProvider/AppProvider'

export const SolanaPageTable = () => {
  const { ecoSystemId, isLoadingId } = useAppContext()
  const { dataTable, isLoading: isLoadingDataTable } = useTableData({ id: ecoSystemId, template: ecosystemTemplate })
  const isLoading = isLoadingId || isLoadingDataTable

  return <div>{isLoading ? <Skeleton height={660} /> : <DataTable columns={columns} data={dataTable} />}</div>
}
