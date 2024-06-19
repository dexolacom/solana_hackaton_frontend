import { useWallet } from '@solana/wallet-adapter-react';
import {
  addressClassicCollection,
  classicPortfolioTokens,
  connection,
  ecosystemPortfolioTokens,
  portfolioLookupTable
} from '../constant';
import { PortfolioDataType } from '../types';
import { useCreateAndSendV0Tx } from './useCreateAndSendV0Tx';
import { useProgramContext } from '@/providers/ProgramProvider/ProgramProvider';
import { useToast } from '@/lib/hooks/useToast';
import { ComputeBudgetProgram, PublicKey } from '@solana/web3.js';
import { getInvertSwapPortfolioData } from '../programData/sdk';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { getInvertSwapPortfolioInstruction } from '../programData/sdk/instructions/invert_swap';

interface UseInvertSwapProps extends PortfolioDataType {
  portfolioMint: PublicKey;
  collectionAddress: string;
  paymentToken: { key: PublicKey; decimals: number };
}

export const useInvertSwap = () => {
  const { publicKey } = useWallet();
  const { createAndSendV0Tx } = useCreateAndSendV0Tx();
  const { program } = useProgramContext();
  const { toast } = useToast();

  const invertSwap = async ({
    collectionId,
    portfolioId,
    portfolioMint,
    collectionAddress,
    paymentToken
  }: UseInvertSwapProps) => {
    if (!publicKey || !program) {
      const error = new Error('Please, connect wallet.');
      toast({
        title: 'Error!',
        description: error.message
      });
      return;
    }

    const portfolioTokens =
      collectionAddress === addressClassicCollection ? classicPortfolioTokens : ecosystemPortfolioTokens;

    const result = [];
    for (const token of portfolioTokens) {
      const acc = getAssociatedTokenAddressSync(token.key, portfolioMint, true);
      const balance = await connection.getTokenAccountBalance(acc);
      result.push({ ...token, amount: balance.value.amount });
    }

    const swap_data = await getInvertSwapPortfolioData(connection, portfolioMint, paymentToken, result);

    const additionalComputeBudgetInstruction = ComputeBudgetProgram.setComputeUnitLimit({
      units: 600000
    });

    const instructions = await getInvertSwapPortfolioInstruction(
      program,
      swap_data,
      collectionAddress === addressClassicCollection ? 4 : 5,
      portfolioId,
      collectionId,
      paymentToken.key,
      publicKey
    );

    await createAndSendV0Tx([additionalComputeBudgetInstruction, instructions[0]], [portfolioLookupTable]);
    await createAndSendV0Tx([additionalComputeBudgetInstruction, instructions[1]], [portfolioLookupTable]);
  };

  return { invertSwap };
};
