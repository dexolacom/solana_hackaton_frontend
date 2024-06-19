import { ComputeBudgetProgram, PublicKey } from '@solana/web3.js';
import { BurnModel, TREASURY, getWithdrawPortfolioInstruction } from '../programData/sdk';
import { useWallet } from '@solana/wallet-adapter-react';
import { useCreateAndSendV0Tx } from './useCreateAndSendV0Tx';
import { useProgramContext } from '@/providers/ProgramProvider/ProgramProvider';
import { useToast } from '@/lib/hooks/useToast';
import { addressClassicCollection, classicPortfolioTokens, ecosystemPortfolioTokens, portfolioLookupTable } from '../constant';
import { PortfolioDataType } from '../types';

interface UseWithdrawProps extends PortfolioDataType {
  collectionAddress: string;
  paymentToken: { key: PublicKey; decimals: number };
}

export const useWithdraw = () => {
  const { publicKey } = useWallet();
  const { createAndSendV0Tx } = useCreateAndSendV0Tx();
  const { program } = useProgramContext();
  const { toast } = useToast();

  const withdraw = async ({portfolioId, collectionId, paymentToken, collectionAddress}: UseWithdrawProps) => {
    if (!publicKey || !program) {
      const error = new Error('Please, connect wallet.');
      toast({
        title: 'Error!',
        description: error.message
      });
      return;
    }

    const portfolioTokens = collectionAddress === addressClassicCollection ? classicPortfolioTokens : ecosystemPortfolioTokens;

    const additionalComputeBudgetInstruction = ComputeBudgetProgram.setComputeUnitLimit({
      units: 500000
    });

    const instruction = await getWithdrawPortfolioInstruction(
      program,
      portfolioId,
      collectionId,
      paymentToken.key,
      publicKey,
      portfolioTokens.map((e) => e.key),
      BurnModel.Swap,
      TREASURY
    );
    await createAndSendV0Tx([additionalComputeBudgetInstruction, instruction], [
      portfolioLookupTable
    ]);
  };
  return {withdraw}
};
