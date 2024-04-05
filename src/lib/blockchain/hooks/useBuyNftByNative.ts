import { ProgramId, TOKEN_METADATA_PROGRAM_ID, decimalsToken } from "@/lib/blockchain/constant";
import { useToast } from "@/lib/hooks/useToast";
import { useProgramContext } from "@/providers/ProgramProvider/ProgramProvider";
import { web3 } from "@coral-xyz/anchor";
import { BN } from '@project-serum/anchor';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  NATIVE_MINT,
  createSyncNativeInstruction,
} from "@solana/spl-token";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { ComputeBudgetProgram, LAMPORTS_PER_SOL, SystemProgram, Transaction } from '@solana/web3.js';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateColectionData } from "../helpers/generateColectionData";
import { getCollectionAddresses } from "../helpers/getCollectionAddresses";
import { getNftAddresses } from "../helpers/getNftAddresses";
import { getOrCreateATA } from "../helpers/getOrCreateATA";
import { BuyNftArgs } from "./useBuyNftByToken";

export const useBuyNftByNative = () => {

  const { publicKey, signTransaction, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { program } = useProgramContext();
  const { toast } = useToast();

  const queryClient = useQueryClient();

  // const collection_data = {
  //   title: "Portfolio#3",
  //   symbol: "PRT",
  //   uri: "https://raw.githubusercontent.com/Coding-and-Crypto/Solana-NFT-Marketplace/master/assets/example.json"
  // }

  const buyNftByNative = async ({ inputValue, nftId, mintCollection }: BuyNftArgs) => {
    const collectionData = generateColectionData(mintCollection)
    if (!publicKey || !program || !signTransaction) {
      toast({
        title: 'Error!',
        description: 'Please, connect wallet'
      });
      return;
    }

    const portfolioCollection = await getCollectionAddresses();
    // console.log("🚀 ~ buyNftByToken ~ masterEditionAccountAddress:", portfolioCollection.masterEditionAccountAddress.toBase58());
    // console.log("🚀 ~ buyNftByToken ~ metadataAccountAddress:", portfolioCollection.metadataAccountAddress.toBase58());
    // console.log("🚀 ~ buyNftByToken ~ onchainDataAddress:", portfolioCollection.onchainDataAddress.toBase58());
    // console.log("🚀 ~ buyNftByToken ~ tokenAccount:", portfolioCollection.tokenAccount.toBase58());

    // const balance = await connection.getBalance(new PublicKey(
    //   "EVuFDMrBNHujcNtWyv8tsuHjSxdMbp78jPERTqhB4wxp"
    // ))
    // console.log("🚀 ~ buyNft ~ balance:", balance)

    const programATA = await getOrCreateATA({ owner: ProgramId, mint: NATIVE_MINT, payer: publicKey, signTransaction });
    const userATA = await getOrCreateATA({ owner: publicKey, mint: NATIVE_MINT, payer: publicKey, signTransaction });

    const solbalance = await connection.getBalance(publicKey);

    if (!solbalance || (solbalance / decimalsToken['SOL'] < inputValue)) {
      toast({
        title: 'Error!',
        description: 'Your SOL account balance is not enough.'
      })
      return;
    }

    const nft = await getNftAddresses({ collection: portfolioCollection.tokenAccount, nftId, owner: publicKey });


    // console.log("🚀 ~ buyNftByToken ~ nftATA:", nft.nftATA.toBase58());
    // console.log("🚀 ~ buyNftByToken ~ masterEditionAccountAddress:", nft.masterEditionAccountAddress.toBase58());
    // console.log("🚀 ~ buyNftByToken ~ metadataAccountAddress:", nft.metadataAccountAddress.toBase58());
    // console.log("🚀 ~ buyNftByToken ~ nftRecord:", nft.nftRecord.toBase58());
    // console.log("🚀 ~ buyNftByToken ~ onchainDataAddress:", nft.onchainDataAddress.toBase58());
    // console.log("🚀 ~ buyNftByToken ~ tokenAccount:", nft.tokenAccount.toBase58());

    const additionalComputeBudgetInstruction =
      ComputeBudgetProgram.setComputeUnitLimit({
        units: 400000,
      });
    // const feePayer = Keypair.fromSecretKey(
    //   bs58.decode("mLLd2nBYkZL2gLVmQvtzn6v61FM6bFPqnFBqvZsSSeDbUkerH5eSDeToCLJ1JTQa32qJ3siCw7xfq5sW6dApmmW")
    // );


    const getWSolbalance = await connection.getTokenAccountBalance(userATA.address);
    const wSolBalance = getWSolbalance?.value.uiAmount;

    if (wSolBalance !== null && wSolBalance < inputValue) {
      const transaction = new Transaction()
      transaction.add(SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: userATA.address,
        lamports: (inputValue - wSolBalance) * LAMPORTS_PER_SOL,
      }),
        createSyncNativeInstruction(userATA.address)
      );
      await sendTransaction(transaction, connection);
      // instructions.push(refillUserATA);
    }

    await program.methods.buyPortfolio(
      nftId,
      collectionData.uri,
      new BN(inputValue * decimalsToken['SOL']),
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
        paymentToken: NATIVE_MINT,
        mplProgram: TOKEN_METADATA_PROGRAM_ID,
        sysvarInstructions: web3.SYSVAR_INSTRUCTIONS_PUBKEY,
        paymentUserTokenAccount: userATA.address,
        paymentProgramTokenAccount: programATA.address,
        splAtaProgram: ASSOCIATED_TOKEN_PROGRAM_ID
      }).preInstructions([additionalComputeBudgetInstruction])
      .rpc()
  }

  const { mutate: buy, isError, isSuccess, isPending: isLoading } = useMutation({
    mutationFn: buyNftByNative,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getNfts'] });
    },
  })

  return { buy, isLoading, isError, isSuccess }
}