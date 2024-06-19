import { useToast } from '@/lib/hooks/useToast';
import { createAssociatedTokenAccountInstruction, createTransferInstruction, getAssociatedTokenAddressSync } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCreateAndSendV0Tx } from './useCreateAndSendV0Tx';
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider';
import { getPortfolioAddresses, getPortfolioCollectionAddresses } from '../programData/sdk';

interface TransferNftProps {
  destinationAddress: PublicKey;
  portfolioId: number;
  collectionId: number;
}

export const useTransferNft = () => {
  const wallet = useWallet();
  const { toast } = useToast();
  const { createAndSendV0Tx } = useCreateAndSendV0Tx();
  const { publicKey, signTransaction } = wallet;
  const { setModalName } = useModalsContext();

  const queryClient = useQueryClient();

  const transferNft = async ({ destinationAddress, portfolioId, collectionId }: TransferNftProps) => {
    if (!publicKey || !signTransaction) {
      const error = new Error('Please, connect wallet.');
      toast({
        title: 'Error!',
        description: error.message
      });
      return;
    }

    const collectionAddress = getPortfolioCollectionAddresses(collectionId)?.collection;
    const portfolio = getPortfolioAddresses(collectionAddress, portfolioId, publicKey);

    const nft_user1_ata = getAssociatedTokenAddressSync(
        portfolio.mint,
        publicKey,
        false
    );

    const nft_user2_ata = getAssociatedTokenAddressSync(
        portfolio.mint,
        destinationAddress,
        false
    );

    const user_nft_ata_instruction = createAssociatedTokenAccountInstruction(
        publicKey,
        nft_user2_ata,
        destinationAddress,
        portfolio.mint
    );

    await createAndSendV0Tx([user_nft_ata_instruction]);

    const instruction = createTransferInstruction(
        nft_user1_ata,
        nft_user2_ata,
        publicKey,
        1
    );

    await createAndSendV0Tx([instruction])

  }

  //   const { collectionMint } = await getCollectionAddresses(portfolioId);
  //   const { nftMint, nftATA } = await getNftAddresses({
  //     collection: collectionMint,
  //     nftId,
  //     owner: publicKey
  //   });

  //   const destinationAddressATA = await getOrCreateATA({
  //     owner: destinationAddress,
  //     mint: nftMint,
  //     payer: publicKey,
  //     signTransaction
  //   });

  //   const instruction = createTransferInstruction(nftATA, destinationAddressATA.address, publicKey, 1);

  //   await createAndSendV0Tx([instruction]);
  // };

  const {
    mutate: transfer,
    isError,
    isSuccess,
    isPending: isLoading
  } = useMutation({
    mutationFn: transferNft,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getNfts'] });
      setModalName('');
      toast({
        title: 'Info',
        description: 'Transfer success'
      });
      // setTimeout(() => {
        // queryClient.invalidateQueries({ queryKey: ['transaction'] });
      // }, 500);
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

  return { transfer, isLoading, isSuccess, isError };
};
