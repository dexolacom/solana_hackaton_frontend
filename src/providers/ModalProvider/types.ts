import { ReactNode } from 'react'

export interface ContextProps {
  modalName: string
  setModalName: React.Dispatch<React.SetStateAction<string>>
  collection: string
  setCollection: React.Dispatch<React.SetStateAction<string>>
  nftPrice: string
  setNftPrice: React.Dispatch<React.SetStateAction<string>>
  nftTitle: string 
  setNftTitle: React.Dispatch<React.SetStateAction<string>>
}

export interface ModalsProviderProps {
  children: ReactNode
}
