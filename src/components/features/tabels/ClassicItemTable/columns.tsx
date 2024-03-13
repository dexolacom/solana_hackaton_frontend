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
    accessorKey: 'coinAmount',
    header: 'Coin Amount'
  },
  {
    accessorKey: "currentPrice",
    header: 'Current Coin Price'
  },
  {
    accessorKey: "24hChange",
    header: '24h Change'
  },
  {
    accessorKey: "earned",
    header: () => <div className="text-right">Earned</div>,
  },
]