import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { ClassicProgramType } from '@/lib/blockchain/programData/classicTypes';
import { EcosystemProgramType } from '@/lib/blockchain/programData/ecosystemTypes';
import {
  commitmentLevel,
  classicProgramId,
  classicProgramInterface,
  ecosystemProgramId,
  ecosystemProgramInterface
} from '@/lib/blockchain/constant';
import { ProgramContextProviderProps, ProgramContextType } from './types';

const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

export const ProgramContextProvider = ({ children }: ProgramContextProviderProps) => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [classicProgram, setClassicProgram] = useState<Program<ClassicProgramType> | null>(null);
  const [ecosystemProgram, setEcosystemProgram] = useState<Program<EcosystemProgramType> | null>(null);

  useEffect(() => {
    if (!wallet) {
      setClassicProgram(null);
      setEcosystemProgram(null);
      return;
    }
    const provider = new AnchorProvider(connection, wallet, {
      preflightCommitment: commitmentLevel,
    });

    const newClassicProgram = new Program(classicProgramInterface, classicProgramId, provider) as Program<ClassicProgramType>;
    const newEcosystemProgram = new Program(ecosystemProgramInterface, ecosystemProgramId, provider) as Program<EcosystemProgramType>;
    setClassicProgram(newClassicProgram);
    setEcosystemProgram(newEcosystemProgram);


  }, [connection, wallet]);

  const contextValue = useMemo(() => ({
    classicProgram,
    setClassicProgram,
    ecosystemProgram,
    setEcosystemProgram
  }), [classicProgram, ecosystemProgram])

  return (
    <ProgramContext.Provider value={contextValue}>
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
