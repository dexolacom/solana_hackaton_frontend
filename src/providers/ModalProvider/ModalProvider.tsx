import { createContext, FC, useContext, useMemo, useState } from 'react'
import { ContextProps, ModalsProviderProps } from './types.ts'

const ModalsContext = createContext<ContextProps | undefined>(undefined)

export const ModalsProvider: FC<ModalsProviderProps> = ({ children }) => {
  const [modalName, setModalName] = useState<string>('')

  const contextValue = useMemo(() => ({ modalName, setModalName }), [modalName])

  return (
    <ModalsContext.Provider value={contextValue}>
      {children}
    </ModalsContext.Provider>
  )
}

export const useModalsContext = (): ContextProps => {
  const context = useContext(ModalsContext)
  if (!context) {
    throw new Error('useModalsContext must be used within a ModalsProvider')
  }
  return context
}
