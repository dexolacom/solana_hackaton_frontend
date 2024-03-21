import { DataTable } from '@/components/widgets/DataTable/DataTable.tsx'
import { columns } from '@/components/features/tabels/ClassicPageTable/columns.tsx'
import { useTableData } from './lib/useTableData'

export const ClassicPageTable = () => {
  const { dataTable } = useTableData();

  return (
    <div>
      <DataTable columns={columns} data={dataTable} />
    </div>
  )
}
