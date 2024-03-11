import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "token",
    header: () => <div className="text-left">Token</div>,
  },
  {
    accessorKey: "riskType",
    header: 'Risk Type'
  },
  {
    accessorKey: "distribution",
    header: 'Distribution'
  },
  {
    accessorKey: "coinPrice",
    header: 'Coin Price'
  },
  {
    accessorKey: "24hChange",
    header: '24h Change'
  },
  {
    accessorKey: "marketCap",
    header: () => <div className="text-right">Market Cup</div>,
  },
]