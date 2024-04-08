import { useItemTableData } from '@/lib/hooks/useItemTableData.ts'
import { columns } from './lib/columns.tsx'
import { DataTable } from '@/components/widgets/DataTable/DataTable.tsx'
import { classicTemplate } from '@/lib/constants.tsx'
import { Skeleton } from '@/components/common/Skeleton/Skeleton.tsx'

export const ClassicItemTable = () => {

  const { dataTable, isLoading } = useItemTableData({ template: classicTemplate })

  return <div>{isLoading ? <Skeleton height={590} /> : <DataTable columns={columns} data={dataTable} />}</div>

}
