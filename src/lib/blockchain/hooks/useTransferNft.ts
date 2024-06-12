import { useToast } from "@/lib/hooks/useToast";
import { createTransferInstruction } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrCreateATA } from "../helpers/getOrCreateATA";
import { getCollectionAddresses } from "../helpers/getCollectionAddresses";
import { getNftAddresses } from "../helpers/getNftAddresses";
import { useCreateAndSendV0Tx } from "./useCreateAndSendV0Tx";
import { useModalsContext } from "@/providers/ModalProvider/ModalProvider";

interface TransferNftProps {
  destinationAddress: PublicKey;
  portfolioId: number;
  nftId: number;
}

export const useTransferNft = () => {
  const wallet = useWallet();
  const { toast } = useToast();
  const { createAndSendV0Tx } = useCreateAndSendV0Tx();
  const { publicKey, signTransaction } = wallet;
  const { setModalName } = useModalsContext();

  const queryClient = useQueryClient();

  const transferNft = async ({
    destinationAddress,
    portfolioId,
    nftId,
  }: TransferNftProps) => {
    if (!publicKey || !signTransaction) {
      const error = new Error("Please, connect wallet.");
      toast({
        title: "Error!",
        description: error.message,
      });
      return;
    }

    const { collectionMint } = await getCollectionAddresses(portfolioId);
    const { nftMint, nftATA } = await getNftAddresses({
      collection: collectionMint,
      nftId,
      owner: publicKey,
    });

    const destinationAddressATA = await getOrCreateATA({
      owner: destinationAddress,
      mint: nftMint,
      payer: publicKey,
      signTransaction,
    });

    const instruction = createTransferInstruction(
      nftATA,
      destinationAddressATA.address,
      publicKey,
      1
    );

    await createAndSendV0Tx([instruction]);
  };

  const {
    mutate: transfer,
    isError,
    isSuccess,
    isPending: isLoading,
  } = useMutation({
    mutationFn: transferNft,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["getNfts"] });
      setModalName("");
      toast({
        title: "Info",
        description: "Transfer success",
      });
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: ['transaction'] });
        }, 500);
    },
    onError: (error) => {
      console.log(error);
      error instanceof Error
        ? toast({
            title: "Error",
            description: error.message,
          })
        : toast({
            title: "Error",
            description: "Unsuccessful operation",
          });
    },
  });

  return { transfer, isLoading, isSuccess, isError };
};
