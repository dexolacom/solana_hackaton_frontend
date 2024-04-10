import { useToast } from "@/lib/hooks/useToast";
import { useProgramContext } from "@/providers/ProgramProvider/ProgramProvider";
import { web3 } from "@coral-xyz/anchor";
// import { getMetadataAccountDataSerializer } from "@metaplex-foundation/mpl-token-metadata";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { ComputeBudgetProgram } from "@solana/web3.js";
import { 
  TOKEN_METADATA_PROGRAM_ID, 
  classicPortfolioTokens, 
  portfolioLookupTable,
} from "@/lib/blockchain/constant";
import { getCollectionAddresses } from "../helpers/getCollectionAddresses";
import { getNftAddresses } from "../helpers/getNftAddresses";
import { useCreateAndSendV0Tx } from "./useCreateAndSendV0Tx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalsContext } from "@/providers/ModalProvider/ModalProvider";

interface BurnPortfolioArgs {
  portfolioId: number;
  nftId: number;
}

export const useBurnPortfolio = () => {
  const { program } = useProgramContext();
  const { publicKey, signTransaction } = useWallet();
  const { createAndSendV0Tx } = useCreateAndSendV0Tx();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { setModalName } = useModalsContext();

  const burnNft = async ({ portfolioId, nftId }: BurnPortfolioArgs) => {

    if (!publicKey || !program || !signTransaction) {
      const error = new Error('Please, connect wallet.');
      toast({
        title: 'Error!',
        description: error.message
      });
      return
    }

    const {
      collectionMint,
      collectionMetadata,
      onchainCollectionData
    } = await getCollectionAddresses(portfolioId);

    const {
      nftMint,
      nftMetaData,
      nftMasterEdition,
      nftATA,
      nftRecord
    } = await getNftAddresses({ collection: collectionMint, nftId, owner: publicKey });

    const atasInstructions = []
    const atas = []

    for (const token of classicPortfolioTokens) {
      const userATA = getAssociatedTokenAddressSync(
        token.key,
        publicKey,
        true,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      const portfolioATA = getAssociatedTokenAddressSync(
        token.key,
        nftMint,
        true,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      atasInstructions.push(
        createAssociatedTokenAccountInstruction(
          publicKey,
          userATA,
          publicKey,
          token.key,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        )
      );
      atas.push(portfolioATA);
      atas.push(userATA);
    }

    const additionalComputeBudgetInstruction =
      ComputeBudgetProgram.setComputeUnitLimit({
        units: 200000,
      });
    await createAndSendV0Tx(atasInstructions)

    const instruction = await program.methods.burnPortfolio(nftId).accounts({
      payer: publicKey,
      collection: collectionMint,
      collectionMetadata: collectionMetadata,
      collectionOnchaindata: onchainCollectionData,
      tokenMint: nftMint,
      nftUserTokenAccount: nftATA,
      nftRecord: nftRecord,
      metadataAccount: nftMetaData,
      masterEditionAccount: nftMasterEdition,
      mplProgram: TOKEN_METADATA_PROGRAM_ID,
      sysvarInstructions: web3.SYSVAR_INSTRUCTIONS_PUBKEY,
      splAtaProgram: ASSOCIATED_TOKEN_PROGRAM_ID
    }).remainingAccounts(atas.map(e => {
      return { pubkey: e, isSigner: false, isWritable: true };
    })).instruction()

    await createAndSendV0Tx(
      [
        additionalComputeBudgetInstruction,
        instruction
      ],
      [portfolioLookupTable]
    )
  }
  const { mutate: burn, isError, isSuccess, isPending: isLoading } = useMutation({
    mutationFn: burnNft,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['getNfts'] });
        setModalName('');
        toast({
          title: 'Error',
          description: 'Burn success',
        });
      }, 3000);
    },
    onError: (error) => {
      console.log(error);
      (error instanceof Error) ?
        toast({
          title: 'Error',
          description: error.message,
        })
        :
        toast({
          title: 'Error',
          description: 'Unsuccessful operation',
        });
    }
  })

  return {burn, isError, isLoading, isSuccess};
}