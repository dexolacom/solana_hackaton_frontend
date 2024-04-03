import { ProgramId, TOKEN_METADATA_PROGRAM_ID, usdcPublicKey } from "@/lib/blockchain/constant";
import { useToast } from "@/lib/hooks/useToast";
import { useProgramContext } from "@/providers/ProgramProvider/ProgramProvider";
import { web3 } from "@coral-xyz/anchor";
import { BN } from '@project-serum/anchor';
import { ASSOCIATED_TOKEN_PROGRAM_ID, } from "@solana/spl-token";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { ComputeBudgetProgram } from '@solana/web3.js';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateColectionData } from "../helpers/generateColectionData";
import { getCollectionAddresses } from "../helpers/getCollectionAddresses";
import { getNftAddresses } from "../helpers/getNftAddresses";
import { getOrCreateATA } from "../helpers/getOrCreateATA";

export interface BuyNftArgs {
  inputValue: number;
  nftId: number;
}

export const useBuyNftByToken = () => {

  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();
  const { program } = useProgramContext();
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const collectionData = generateColectionData('Classic')
  const buyNftByToken = async ({ inputValue, nftId }: BuyNftArgs) => {

    if (!publicKey || !program || !signTransaction) {
      toast({
        title: 'Error!',
        description: 'Please, connect wallet'
      });
      return;
    }

    const portfolioCollection = await getCollectionAddresses();

    const userATA = await getOrCreateATA({ owner: publicKey, mint: usdcPublicKey, payer: publicKey, signTransaction });
    const programATA = await getOrCreateATA({ owner: ProgramId, mint: usdcPublicKey, payer: publicKey, signTransaction });

    const getBalance = await connection.getTokenAccountBalance(userATA.address);
    const usdcBalance = getBalance?.value.uiAmount;

    if (!usdcBalance || usdcBalance < inputValue) {
      toast({
        title: 'Error!',
        description: 'Your USDC account balance is not enough.'
      })
      return;
    }

    const nft = await getNftAddresses({ collection: portfolioCollection.tokenAccount, nftId, owner: publicKey });

    const additionalComputeBudgetInstruction =
      ComputeBudgetProgram.setComputeUnitLimit({
        units: 400000,
      });

    await program.methods.buyPortfolio(
      nftId,
      collectionData.uri,
      new BN(inputValue * 10e5),
    )
      .accounts({
        payer: publicKey,
        nftUserTokenAccount: nft.nftATA,
        nftRecord: nft.nftRecord,
        portfolioData: nft.onchainDataAddress,
        tokenMint: nft.tokenAccount,
        metadataAccount: nft.metadataAccountAddress,
        masterEditionAccount: nft.masterEditionAccountAddress,
        collectionMetadata: portfolioCollection.onchainDataAddress,
        collection: portfolioCollection.tokenAccount,
        paymentToken: usdcPublicKey,
        mplProgram: TOKEN_METADATA_PROGRAM_ID,
        sysvarInstructions: web3.SYSVAR_INSTRUCTIONS_PUBKEY,
        paymentUserTokenAccount: userATA.address,
        paymentProgramTokenAccount: programATA.address,
        splAtaProgram: ASSOCIATED_TOKEN_PROGRAM_ID
      }).preInstructions([additionalComputeBudgetInstruction]).rpc()
  }

  const { mutate: buy, isError, isSuccess, isPending: isLoading } = useMutation({
    mutationFn: buyNftByToken,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getNfts'] })
    },
  })

  return { buy, isError, isSuccess, isLoading }
}