export interface ProjectType {
  id: string,
  name: string,
  created_at: string,
  updated_at: string
}

export interface TokenType {
  id: string,
  name: string,
  symbol: string,
  riskType: 'Low' | 'Medium' | 'High',
  coinmarketcapId: number,
  created_at: string,
  updated_at: string
}
