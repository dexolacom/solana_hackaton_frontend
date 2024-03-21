import { ReactNode } from 'react'

export interface AppContextProps {
  balance: number
  getBalance: () => Promise<void>
  classicId?: string 
  ecoSystemId?: string
}

export interface AppProviderProps {
  children: ReactNode
}