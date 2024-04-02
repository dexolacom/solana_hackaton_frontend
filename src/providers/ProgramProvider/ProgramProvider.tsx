import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {  useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { AnchorProvider, Program} from "@coral-xyz/anchor";
import { ProgramType } from '@/lib/blockchain/programData/types';
import { commitmentLevel, ProgramId, ProgramInterface } from '@/lib/blockchain/constant';


interface ProgramContextType {
  program: Program<ProgramType> | null;
}

const ProgramContext = createContext<ProgramContextType | undefined>({ program: null });

interface ProgramContextProviderProps {
  children: ReactNode;
}

export const ProgramContextProvider = ({ children }: ProgramContextProviderProps) => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [program, setProgram] = useState<Program<ProgramType>| null>(null);

  useEffect(() => {
    if (!wallet) {
      setProgram(null);
      return;
    }
    const provider = new AnchorProvider(connection, wallet, {
      preflightCommitment: commitmentLevel,
    });
    const newProgram = new Program(ProgramInterface, ProgramId, provider) as Program<ProgramType>;
    setProgram(newProgram);


  }, [connection, wallet]);

  return (
    <ProgramContext.Provider value={{ program }}>
      {children}
    </ProgramContext.Provider>
  );
};

export const useProgramContext = () => {
  const context = useContext(ProgramContext)
  if (!context) {
    throw new Error('useProgramContext must be used within a ModalsProvider')
  }
  return context
}
