import { useBalance } from '@/lib/hooks/useBalance.ts';
import { createContext, useContext, useMemo } from 'react';
import { AppContextProps, AppProviderProps } from './types.ts';

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: AppProviderProps) => {
  const { balance, getBalance } = useBalance();

  const contextValue = useMemo(
    () => ({
      balance,
      getBalance
    }),
    [balance, getBalance]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
};
