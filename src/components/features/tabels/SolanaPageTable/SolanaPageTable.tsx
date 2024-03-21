import { columns } from '@/components/features/tabels/SolanaPageTable/lib/columns'
import { DataTable } from '@/components/widgets/DataTable/DataTable.tsx'
import { ecosystemTemplate } from '@/lib/constants'
import { useTableData } from '@/lib/hooks/useTableData'
import { useAppContext } from '@/providers/AppProvider/AppProvider'


export const SolanaPageTable = () => {

  const { ecoSystemId } = useAppContext();
  const { dataTable } = useTableData({ id: ecoSystemId, template: ecosystemTemplate });

  return (
    <div>
      <DataTable columns={columns} data={dataTable} />
    </div>
  )
}
