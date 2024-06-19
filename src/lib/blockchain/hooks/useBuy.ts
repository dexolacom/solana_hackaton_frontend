import { ComputeBudgetProgram, PublicKey } from '@solana/web3.js';
import { TREASURY, getBuyPortfolioInstruction } from '../programData/sdk';
import { portfolioLookupTable } from '../constant';
import { BN } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { useCreateAndSendV0Tx } from './useCreateAndSendV0Tx';
import { useProgramContext } from '@/providers/ProgramProvider/ProgramProvider';
import { useToast } from '@/lib/hooks/useToast';
import { generateColectionData } from '../helpers/generateColectionData';
import { PortfolioDataType } from '../types';

interface UseBuyArgs extends PortfolioDataType {
  amount: BN;
  paymentToken: PublicKey;
  collectionAddress: PublicKey;
}

export const useBuy = () => {
  const { publicKey } = useWallet();
  const { createAndSendV0Tx } = useCreateAndSendV0Tx();
  const { program } = useProgramContext();
  const { toast } = useToast();

  const buy = async ({ portfolioId, collectionId, amount, paymentToken, collectionAddress }: UseBuyArgs) => {
    if (!publicKey || !program) {
      const error = new Error('Please, connect wallet.');
      toast({
        title: 'Error!',
        description: error.message
      });
      return;
    }

    const additionalComputeBudgetInstruction = ComputeBudgetProgram.setComputeUnitLimit({
      units: 500000
    });

    const instruction = await getBuyPortfolioInstruction(
      program,
      portfolioId,
      collectionId,
      paymentToken,
      publicKey,
      generateColectionData(collectionAddress.toString()).uri,
      amount,
      TREASURY
    );

    await createAndSendV0Tx([additionalComputeBudgetInstruction, instruction], [portfolioLookupTable]);
  };

  return { buy };
};
