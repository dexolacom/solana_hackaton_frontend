import { ReactNode } from 'react'
import { Program } from '@coral-xyz/anchor';
import { ClassicProgramType } from '@/lib/blockchain/programData/classicTypes';
import { EcosystemProgramType } from '@/lib/blockchain/programData/ecosystemTypes';

export interface ProgramContextType {
  classicProgram: Program<ClassicProgramType> | null
  setClassicProgram: React.Dispatch<React.SetStateAction<Program<ClassicProgramType> | null>>
  ecosystemProgram: Program<EcosystemProgramType> | null
  setEcosystemProgram: React.Dispatch<React.SetStateAction<Program<EcosystemProgramType> | null>>
}

export interface ProgramContextProviderProps {
  children: ReactNode;
}

