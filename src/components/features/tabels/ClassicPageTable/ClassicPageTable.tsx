import { DataTable } from '@/components/widgets/DataTable/DataTable.tsx'
import { columns } from '@/components/features/tabels/ClassicPageTable/lib/columns'
import { useTableData } from './lib/useTableData'
import { useAppContext } from '@/providers/AppProvider/AppProvider'

export const ClassicPageTable = () => {
  const { classicId } = useAppContext();
  const { dataTable } = useTableData(classicId);

  return (
    <div>
      <DataTable columns={columns} data={dataTable} />
    </div>
  )
}
