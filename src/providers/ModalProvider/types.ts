import { ReactNode } from 'react'

export interface ContextProps {
  modalName: string
  setModalName: (s: string) => void
  mint: string
  setMint: (s: string) => void
}

export interface ModalsProviderProps {
  children: ReactNode
}
