import { useWallet } from '@solana/wallet-adapter-react';
import { useCreateAndSendV0Tx } from './useCreateAndSendV0Tx';
import { useProgramContext } from '@/providers/ProgramProvider/ProgramProvider';
import { useToast } from '@/lib/hooks/useToast';
import { TransactionInstruction } from '@solana/web3.js';
import { getReceivePortfolioInstruction } from '../programData/sdk';

interface UseReceiveArgs {
  portfolioId: number;
  collectionId: number;
}

export const useReceive = () => {
  const { publicKey } = useWallet();
  const { createAndSendV0Tx } = useCreateAndSendV0Tx();
  const { program } = useProgramContext();
  const { toast } = useToast();

  const receive = async ({ collectionId, portfolioId }: UseReceiveArgs) => {
    if (!publicKey || !program) {
      const error = new Error('Please, connect wallet.');
      toast({
        title: 'Error!',
        description: error.message
      });
      return;
    }

    const instructions: TransactionInstruction[] = await getReceivePortfolioInstruction(
      program,
      portfolioId,
      collectionId,
      publicKey,
      true
    );

    await createAndSendV0Tx(instructions);
  };

  return { receive };
};
