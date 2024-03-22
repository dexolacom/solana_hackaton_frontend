import { createContext, useContext, useMemo } from 'react'
import { AppContextProps, AppProviderProps } from './types.ts'
import { useBalance } from '@/lib/hooks/useBalance.ts'
import { useProjectList } from '@/lib/api/hooks/useProjectList.ts'

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppProvider = ({ children }: AppProviderProps) => {
  const { balance, getBalance } = useBalance()
  const { projectList, isLoading: isLoadingId } = useProjectList()
  const classicId = projectList?.find((item) => item.name === 'Classic')?.id
  const ecoSystemId = projectList?.find((item) => item.name === 'Solana Ecosystem')?.id

  const contextValue = useMemo(
    () => ({ balance, getBalance, classicId, ecoSystemId, isLoadingId }),
    [balance, getBalance, classicId, ecoSystemId, isLoadingId]
  )

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider')
  }
  return context
}
