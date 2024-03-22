interface BaseData {
  id: string
  created_at: string
  updated_at: string
}
interface InfoCoin {
  name: string
  symbol: string
  riskType: 'Low' | 'Medium' | 'High'
}

export interface ProjectType extends BaseData {
  name: string
}

export interface ResponseProjectTypeItem {
  name: string
  tokens: ProjectTypeItem[]
}
export interface ProjectTypeItem extends InfoCoin {
  coinPrice: number
  change24h: number
  marketCap: number
}

export interface TokenType extends InfoCoin, BaseData {
  coinmarketcapId: number
}
