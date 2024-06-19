import { BN } from '@project-serum/anchor';
import { connection, portfolioLookupTable } from '../constant';
import { ComputeBudgetProgram, PublicKey } from '@solana/web3.js';
import { getSwapPortfolioData, getSwapPortfolioInstruction } from '../programData/sdk';
import { useWallet } from '@solana/wallet-adapter-react';
import { useCreateAndSendV0Tx } from './useCreateAndSendV0Tx';
import { useProgramContext } from '@/providers/ProgramProvider/ProgramProvider';
import { useToast } from '@/lib/hooks/useToast';

interface UseSwapArgs {
  portfolioId: number;
  collectionId: number;
  portfolioMint: PublicKey;
  amount: BN;
  paymentToken: { key: PublicKey; decimals: number };
  tokens: { key: PublicKey; percent: number; decimals: number }[];
  swapCount: number
}

export const useSwap = () => {
  const { publicKey } = useWallet();
  const { createAndSendV0Tx } = useCreateAndSendV0Tx();
  const { program } = useProgramContext();
  const { toast } = useToast();

  const swap = async ({
    portfolioId,
    collectionId,
    portfolioMint,
    amount,
    paymentToken,
    tokens,
    swapCount
  }: UseSwapArgs) => {
    if (!publicKey || !program) {
      const error = new Error('Please, connect wallet.');
      toast({
        title: 'Error!',
        description: error.message
      });
      return;
    }

    const swap_data = await getSwapPortfolioData(connection, portfolioMint, amount, paymentToken, tokens);

    const instructions = await getSwapPortfolioInstruction(
      program,
      swap_data,
      swapCount,
      portfolioId,
      collectionId,
      paymentToken.key,
      publicKey
    );

    const additionalComputeBudgetInstruction = ComputeBudgetProgram.setComputeUnitLimit({
      units: 600000
    });

    await createAndSendV0Tx([additionalComputeBudgetInstruction, instructions[0]], [portfolioLookupTable]);
    await createAndSendV0Tx([additionalComputeBudgetInstruction, instructions[1]], [portfolioLookupTable]);
  };
    

  return { swap };
};
