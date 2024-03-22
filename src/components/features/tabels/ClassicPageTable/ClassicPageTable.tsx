import { Skeleton } from '@/components/common/Skeleton/Skeleton'
import { DataTable } from '@/components/widgets/DataTable/DataTable.tsx'
import { columns } from '@/components/features/tabels/ClassicPageTable/lib/columns'
import { useTableData } from '@/lib/hooks/useTableData.ts'
import { classicTemplate } from '@/lib/constants'
import { useAppContext } from '@/providers/AppProvider/AppProvider'

export const ClassicPageTable = () => {
  const { classicId, isLoadingId } = useAppContext()
  const { dataTable, isLoading: isLoadingDataTable } = useTableData({ id: classicId, template: classicTemplate })
  const isLoading = isLoadingId || isLoadingDataTable

  return <div>{isLoading ? <Skeleton height={590} /> : <DataTable columns={columns} data={dataTable} />}</div>
}
