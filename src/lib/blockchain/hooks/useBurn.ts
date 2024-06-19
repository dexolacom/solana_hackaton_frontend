import { useWallet } from '@solana/wallet-adapter-react';
import {
  getBurnPortfolioInstruction,
  getPortfolioAddresses,
  getPortfolioCollectionAddresses
} from '../programData/sdk';
import { BurnModel } from '../programData/sdk';
import { useCreateAndSendV0Tx } from './useCreateAndSendV0Tx';
import { useProgramContext } from '@/providers/ProgramProvider/ProgramProvider';
import { useToast } from '@/lib/hooks/useToast';
import { PublicKey } from '@solana/web3.js';
import { getCoinData } from '../helpers/getCoinData';
import { PortfolioDataType } from '../types';
import { useInvertSwap } from './useInvertSwap';
import { useWithdraw } from './useWithdraw';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider';

export const useBurn = () => {
  const { publicKey } = useWallet();
  const { createAndSendV0Tx } = useCreateAndSendV0Tx();
  const { program } = useProgramContext();
  const { toast } = useToast();
  const { invertSwap } = useInvertSwap();
  const { withdraw } = useWithdraw();
  const queryClient = useQueryClient();
  const { setModalName } = useModalsContext();

  const usdcData = getCoinData('USDC');

  const burnPortfolio = async ({ collectionId, portfolioId }: PortfolioDataType) => {
    if (!publicKey || !program) {
      const error = new Error('Please, connect wallet.');
      toast({
        title: 'Error!',
        description: error.message
      });
      return;
    }

    const collectionAddress = getPortfolioCollectionAddresses(collectionId)?.collection;
    const portfolio = getPortfolioAddresses(collectionAddress, portfolioId, publicKey);

    const paymentToken = { key: new PublicKey(usdcData.mint), decimals: usdcData.decimals / 1e6 }

    const instruction = await getBurnPortfolioInstruction(
      program,
      portfolioId,
      collectionId,
      paymentToken.key,
      publicKey,
      BurnModel.Swap
    );

    await createAndSendV0Tx([instruction]);

    await invertSwap({
      collectionId,
      portfolioId,
      portfolioMint: portfolio.mint,
      paymentToken,
      collectionAddress: collectionAddress.toString()
    });

    await withdraw({
      collectionId,
      portfolioId,
      paymentToken,
      collectionAddress: collectionAddress.toString()
    })
  };

  const {
    mutate: burn,
    isError,
    isSuccess,
    isPending: isLoading
  } = useMutation({
    mutationFn: burnPortfolio,
    onSuccess: () => {
      // setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['getNfts'] });
        setModalName('');
        toast({
          title: 'Info',
          description: 'Burn success'
        });
      // }, 3000);
    },
    onError: (error) => {
      console.log(error);
      error instanceof Error
        ? toast({
            title: 'Error',
            description: error.message
          })
        : toast({
            title: 'Error',
            description: 'Unsuccessful operation'
          });
    }
  });

  return {burn, isLoading, isSuccess, isError}
};


