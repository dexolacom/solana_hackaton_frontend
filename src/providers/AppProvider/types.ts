import { ReactNode } from 'react'

export interface AppContextProps {
  balance: number
  getBalance: () => Promise<void>
  invested: number
  setInvested: React.Dispatch<React.SetStateAction<number>>
}

export interface AppProviderProps {
  children: ReactNode
}
