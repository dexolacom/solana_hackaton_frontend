import { Skeleton } from '@/components/common/Skeleton/Skeleton'
import { DataTable } from '@/components/widgets/DataTable/DataTable.tsx'
import { columns } from '@/components/features/tabels/ClassicPageTable/lib/columns'
import { useTableData } from '@/lib/hooks/useTableData.ts'
import { classicTemplate } from '@/lib/constants'

export const ClassicPageTable = () => {
  const { dataTable, isLoading } = useTableData({template: classicTemplate })

  return <div>{isLoading ? <Skeleton height={400} /> : <DataTable columns={columns} data={dataTable} />}</div>
}
