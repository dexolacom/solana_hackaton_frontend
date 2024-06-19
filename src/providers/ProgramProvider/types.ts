import { ReactNode } from 'react';
import { Program } from '@coral-xyz/anchor';
import { Biscuit } from '@/lib/blockchain/programData/types';
import { WhirlpoolContext } from '@orca-so/whirlpools-sdk';

export interface ProgramContextType {
  program: Program<Biscuit> | null;
  setProgram: React.Dispatch<React.SetStateAction<Program<Biscuit> | null>>;
  whirlpool: WhirlpoolContext | null;
}

export interface ProgramContextProviderProps {
  children: ReactNode;
}
