import { DataTable } from '@/components/widgets/DataTable/DataTable.tsx';
import { columns } from '@/components/features/tabels/SolanaItemTable/lib/columns';
import { useItemTableData } from '@/lib/hooks/useItemTableData';
import { ecosystemTemplate } from '@/lib/constants';
import { Skeleton } from '@/components/common/Skeleton/Skeleton';

export const SolanaItemTable = () => {
  const { dataTable, isLoading } = useItemTableData({ template: ecosystemTemplate });

  return <div>{isLoading ? <Skeleton height={660} /> : <DataTable columns={columns} data={dataTable} />}</div>;
};
