import { useState } from 'react';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  NATIVE_MINT,
  createSyncNativeInstruction,

} from "@solana/spl-token";
import { web3 } from "@coral-xyz/anchor";
import { ComputeBudgetProgram, SystemProgram, LAMPORTS_PER_SOL, Transaction } from '@solana/web3.js';
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { TOKEN_METADATA_PROGRAM_ID } from "@/lib/blockchain/constant";
import { ProgramId } from '@/lib/blockchain/constant'
import { getOrCreateATA } from "../helpers/getOrCreateATA";
import { useToast } from "@/lib/hooks/useToast";
import { useProgramContext } from "@/providers/ProgramProvider/ProgramProvider";
import { getCollectionAddresses } from "../helpers/getCollectionAddresses";
import { getNftAddresses } from "../helpers/getNftAddresses";
import { BuyNftArgs } from "./useBuyNftByToken";
import { BN } from '@project-serum/anchor';

export const useBuyNftByNative = () => {

  const { publicKey, signTransaction, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { program } = useProgramContext();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const collection_data = {
    title: "Portfolio#3",
    symbol: "PRT",
    uri: "https://raw.githubusercontent.com/Coding-and-Crypto/Solana-NFT-Marketplace/master/assets/example.json"
  }

  const buyNftByNative = async ({ inputValue, nftId }: BuyNftArgs) => {
    if (!publicKey || !program || !signTransaction) {
      toast({
        title: 'Error!',
        description: 'Please, connect wallet'
      });
      return;
    }

    try {
      setIsError(false);
      setIsSuccess(false);
      setIsLoading(true);

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
      console.log("🚀 ~ buyNft ~ programATA:", programATA.address.toBase58())
      const userATA = await getOrCreateATA({ owner: publicKey, mint: NATIVE_MINT, payer: publicKey, signTransaction });
      console.log("🚀 ~ buyNft ~ userATA:", userATA.address.toBase58())

      const solbalance = await connection.getBalance(publicKey);

      if (!solbalance || (solbalance / 10e8 < inputValue)) {
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


      if (wSolBalance && wSolBalance < inputValue) {
        const transaction = new Transaction()
        transaction.add(SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: userATA.address,
          lamports: (inputValue - wSolBalance) * LAMPORTS_PER_SOL,
        }),
          createSyncNativeInstruction(userATA.address)
        );
        sendTransaction(transaction, connection);
        // instructions.push(refillUserATA);
      }

      await program.methods.buyPortfolio(
        nftId,
        collection_data.uri,
        new BN(inputValue * 10e8),
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

      setIsSuccess(true);
      setIsLoading(false);
    }
    catch {
      setIsError(true);
      setIsLoading(false);
      setIsSuccess(false);
    }
  }
  return { buyNftByNative, isLoading, isError, isSuccess }
}