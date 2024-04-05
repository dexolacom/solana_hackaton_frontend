import { ProgramId, TOKEN_METADATA_PROGRAM_ID, decimalsToken, usdcPublicKey } from "@/lib/blockchain/constant";
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
import { useModalsContext } from "@/providers/ModalProvider/ModalProvider";

export interface BuyNftArgs {
  inputValue: number;
  nftId: number;
  mintCollection: string;
}

export const useBuyNftByToken = () => {

  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();
  const { program } = useProgramContext();
  const { toast } = useToast();
  const { setModalName, setNftPrice } = useModalsContext();
  const queryClient = useQueryClient();

  
  const buyNftByToken = async ({ inputValue, nftId, mintCollection }: BuyNftArgs) => {
    const collectionData = generateColectionData(mintCollection)
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
      new BN(inputValue * decimalsToken['USDC']),
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

      setNftPrice(`${inputValue} USDC`);
  }

  const { mutate: buy, isError, isSuccess, isPending: isLoading } = useMutation({
    mutationFn: buyNftByToken,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getNfts'] });
      setModalName('INVEST');
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Unsuccessful operation',
      })
    }
  })

  return { buy, isError, isSuccess, isLoading }
}