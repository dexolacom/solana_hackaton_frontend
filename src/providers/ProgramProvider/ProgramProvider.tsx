import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { ProgramType } from '@/lib/blockchain/programData/types';
import { commitmentLevel, programId, classicProgramInterface } from '@/lib/blockchain/constant';
import { ProgramContextProviderProps, ProgramContextType } from './types';
import { ORCA_WHIRLPOOL_PROGRAM_ID, WhirlpoolContext } from '@orca-so/whirlpools-sdk';

const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

export const ProgramContextProvider = ({ children }: ProgramContextProviderProps) => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [program, setProgram] = useState<Program<ProgramType> | null>(null);

  const [whirlpool, setWhirlpool] = useState<WhirlpoolContext | null>(null);

  useEffect(() => {
    if (!wallet) {
      setProgram(null);
      setWhirlpool(null);
      return;
    }
    const provider = new AnchorProvider(connection, wallet, {
      preflightCommitment: commitmentLevel
    });

    const whirlpoolCtx = WhirlpoolContext.withProvider(provider, ORCA_WHIRLPOOL_PROGRAM_ID);
    setWhirlpool(whirlpoolCtx);
    const newProgram = new Program(classicProgramInterface, programId, provider) as Program<ProgramType>;
    setProgram(newProgram);
  }, [connection, wallet]);

  const contextValue = useMemo(
    () => ({
      program,
      setProgram,
      whirlpool
    }),
    [program, whirlpool]
  );

  return <ProgramContext.Provider value={contextValue}>{children}</ProgramContext.Provider>;
};

export const useProgramContext = () => {
  const context = useContext(ProgramContext);
  if (!context) {
    throw new Error('useProgramContext must be used within a ModalsProvider');
  }
  return context;
};
