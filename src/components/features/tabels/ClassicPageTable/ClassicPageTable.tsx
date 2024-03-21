import { DataTable } from '@/components/widgets/DataTable/DataTable.tsx'
import { columns } from '@/components/features/tabels/ClassicPageTable/lib/columns'
import { useTableData } from '../../../../lib/hooks/useTableData'
import { classicTemplate } from '@/lib/constants'
import { useAppContext } from '@/providers/AppProvider/AppProvider'

export const ClassicPageTable = () => {
  const { classicId } = useAppContext();
  const { dataTable } = useTableData({ id: classicId, template: classicTemplate });

  return (
    <div>
      <DataTable columns={columns} data={dataTable} />
    </div>
  )
}
