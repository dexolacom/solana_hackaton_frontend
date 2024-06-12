import { ReactNode } from 'react';
import { Program } from '@coral-xyz/anchor';
import { ProgramType } from '@/lib/blockchain/programData/types';
import { WhirlpoolContext } from '@orca-so/whirlpools-sdk';

export interface ProgramContextType {
  program: Program<ProgramType> | null;
  setProgram: React.Dispatch<React.SetStateAction<Program<ProgramType> | null>>;
  whirlpool: WhirlpoolContext | null;
}

export interface ProgramContextProviderProps {
  children: ReactNode;
}
