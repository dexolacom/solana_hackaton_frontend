import {
  addressClassicCollection,
  connection,
  ecosystemPortfolioTokens
  // portfolioLookupTable,
  // addressClassicCollection,
  // classicPotrfolioId,
  // ecosystemPortfolioId,
} from '@/lib/blockchain/constant';
import { getCoinData } from '../helpers/getCoinData';
import { useToast } from '@/lib/hooks/useToast';
import { useProgramContext } from '@/providers/ProgramProvider/ProgramProvider';
import { BN } from '@project-serum/anchor';
import { createAssociatedTokenAccountInstruction, getAssociatedTokenAddressSync } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCreateAndSendV0Tx } from './useCreateAndSendV0Tx';
import { getPortfolioAddresses } from '../programData/sdk/portfolio';
import { getPortfolioCollectionAddresses } from '../programData/sdk/collection';
import { classicPortfolioTokens } from '@/lib/blockchain/constant';
import { useSwap } from './useSwap';
import { useReceive } from './useReceive';
import { useBuy } from './useBuy';
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider';

export interface BuyNftArgs {
  inputValue: number;
  portfolioId: number;
  collectionId: number;
}

export const useMintPortfolio = (swapCount: number) => {

  const { publicKey, signTransaction } = useWallet();
  const { program } = useProgramContext();
  const { toast } = useToast();
  const { buy } = useBuy();
  const { swap } = useSwap();
  const { receive } = useReceive();
  const { setModalName, setNftPrice } = useModalsContext();
  const queryClient = useQueryClient();
  // const { getPortfolioSwapData } = usePortfolioSwapData();
  const { createAndSendV0Tx } = useCreateAndSendV0Tx();

  const usdcData = getCoinData('USDC');
  const paymentToken = new PublicKey(usdcData.mint);
  // const usdcPublicKey = new PublicKey(usdcData.mint);

  const mint = async ({ inputValue, portfolioId, collectionId }: BuyNftArgs) => {
    if (!publicKey || !program || !signTransaction) {
      const error = new Error('Please, connect wallet.');
      toast({
        title: 'Error!',
        description: error.message
      });
      return;
    }

    const collectionAddress = getPortfolioCollectionAddresses(collectionId)?.collection;

    const amount = new BN(inputValue).mul(new BN(usdcData.decimals));

    const usdcATA = getAssociatedTokenAddressSync(new PublicKey(usdcData.mint), publicKey);

    const getBalance = await connection.getTokenAccountBalance(usdcATA);
    const usdcBalance = getBalance?.value?.uiAmount;

    if (!usdcBalance || usdcBalance < inputValue) {
      const error = new Error('Your USDC account balance is not enough.');
      toast({
        title: 'Error!',
        description: error.message
      });
      throw error;
    }

    await buy({
      portfolioId,
      collectionId,
      collectionAddress,
      paymentToken,
      amount
    });

    const portfolio = getPortfolioAddresses(collectionAddress, portfolioId, publicKey);
    const portfolioTokens =
      collectionAddress.toString() === addressClassicCollection ? classicPortfolioTokens : ecosystemPortfolioTokens;

    const instructions: TransactionInstruction[] = [];
    for (const token of portfolioTokens) {
      const ata = getAssociatedTokenAddressSync(token.key, portfolio.mint, true);

      instructions.push(createAssociatedTokenAccountInstruction(publicKey, ata, portfolio.mint, token.key));
    }

    await createAndSendV0Tx(instructions);

    await swap({
      portfolioId,
      collectionId,
      portfolioMint: portfolio.mint,
      amount,
      paymentToken: { key: new PublicKey(usdcData.mint), decimals: usdcData.decimals / 1e6 },
      tokens: portfolioTokens,
      swapCount
    });

    await receive({
      portfolioId,
      collectionId
    });

    setNftPrice(`${inputValue}`);
  };

  const {
    mutate: mintPortfolio,
    isError,
    isSuccess,
    isPending: isLoading
  } = useMutation({
    mutationFn: mint,
    onSuccess: () => {
      setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['getNfts'] });
      setModalName('INVEST');
      }, 3000);
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

  return { mintPortfolio, isError, isSuccess, isLoading };
};
