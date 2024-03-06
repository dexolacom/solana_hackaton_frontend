import { DataTable } from '@/components/tables/DataTable.tsx';
import { columns } from '@/components/tables/ClassicPageTable/columns.ts';

export const ClassicPageTable = () => {
  type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
  }

  const data: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    }
  ]

  return (
    <div>
      <DataTable columns={columns} data={data}/>
    </div>
  )
}