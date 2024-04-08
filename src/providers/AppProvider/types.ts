import { ReactNode } from 'react'

export interface AppContextProps {
  balance: number
  getBalance: () => Promise<void>
}

export interface AppProviderProps {
  children: ReactNode
}
