
import {
  Account,
  createAssociatedTokenAccountInstruction,
  TokenInvalidAccountOwnerError,
  TokenAccountNotFoundError,
  getAccount,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  NATIVE_MINT, getAssociatedTokenAddress
} from "@solana/spl-token";
import { AnchorProvider, Program, web3 } from "@coral-xyz/anchor";
import { Transaction, PublicKey, ComputeBudgetProgram } from '@solana/web3.js';
import { useWallet, useAnchorWallet } from '@solana/wallet-adapter-react'
import { TOKEN_METADATA_PROGRAM_ID } from "@/lib/blockchain/constant";
import { ProgramType } from "../programData/types";
import { connection, commitmentLevel, ProgramId, ProgramInterface } from '@/lib/blockchain/constant'
import { getOrCreateATA } from "../helpers/getOrCreateATA";

export const useBuyNftByNative = () => {
  const wallet = useAnchorWallet();

  const { signTransaction, publicKey } = useWallet();

  if (!wallet || !publicKey || !signTransaction) return { buyNft: () => { } };

  //вынести в контекст
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: commitmentLevel,
  })

  const program = new Program(ProgramInterface, ProgramId, provider) as Program<ProgramType>

  const collection_data = {
    title: "Portfolio#3",
    symbol: "PRT",
    uri: "https://raw.githubusercontent.com/Coding-and-Crypto/Solana-NFT-Marketplace/master/assets/example.json"
  }

  async function getCollectionAddresses() {
    const associatedTokenAccount = PublicKey.findProgramAddressSync(
      [
        Buffer.from("collection")
      ],
      program.programId
    )[0]

    const metadataAccountAddress = PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        associatedTokenAccount.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID
    )[0]

    const masterEditionAccountAddress = PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        associatedTokenAccount.toBuffer(),
        Buffer.from("edition")
      ],
      TOKEN_METADATA_PROGRAM_ID
    )[0]

    const onchainDataAddress = PublicKey.findProgramAddressSync(
      [
        Buffer.from("onchain-data"),
        metadataAccountAddress.toBuffer(),
      ],
      program.programId
    )[0]

    return {
      tokenAccount: associatedTokenAccount,
      metadataAccountAddress,
      masterEditionAccountAddress,
      onchainDataAddress
    }
  }

  async function getNftAddresses(collection: PublicKey, id: number) {
    const associatedTokenAccount = PublicKey.findProgramAddressSync(
      [
        Buffer.from("token"),
        collection.toBuffer(),
        Buffer.from([id])
      ],
      program.programId
    )[0]

    const metadataAccountAddress = PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        associatedTokenAccount.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID
    )[0]

    const masterEditionAccountAddress = PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        associatedTokenAccount.toBuffer(),
        Buffer.from("edition")
      ],
      TOKEN_METADATA_PROGRAM_ID
    )[0]

    const onchainDataAddress = PublicKey.findProgramAddressSync(
      [
        Buffer.from("onchain-data"),
        metadataAccountAddress.toBuffer(),
      ],
      program.programId
    )[0]

    const nftATA = await getAssociatedTokenAddress(
      associatedTokenAccount,
      publicKey
    )

    const nftRecord = PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        associatedTokenAccount.toBuffer(),
        Buffer.from("token_record"),
        nftATA.toBuffer()
      ],
      TOKEN_METADATA_PROGRAM_ID
    )[0]

    return {
      tokenAccount: associatedTokenAccount,
      metadataAccountAddress,
      masterEditionAccountAddress,
      onchainDataAddress,
      nftATA,
      nftRecord
    }
  }
  // const feePayer = Keypair.fromSecretKey(
  //   bs58.decode("mLLd2nBYkZL2gLVmQvtzn6v61FM6bFPqnFBqvZsSSeDbUkerH5eSDeToCLJ1JTQa32qJ3siCw7xfq5sW6dApmmW")
  // );


  // const getOrCreateATA = async (id: PublicKey) => {
  //   const associatedToken = await getAssociatedTokenAddress(
  //     NATIVE_MINT,
  //     id,
  //     false
  //   );

  //   //associatedToken program: Gqrq7voWqp9MWMQ9mR8UcW17LPRR9rmAwS5UufiHR3Cp
  //   //associatedToken user: EVuFDMrBNHujcNtWyv8tsuHjSxdMbp78jPERTqhB4wxp

  //   let account: Account;
  //   try {
  //     account = await getAccount(connection, associatedToken, commitmentLevel);
  //   } catch (error: unknown) {
  //     if (error instanceof TokenAccountNotFoundError || error instanceof TokenInvalidAccountOwnerError) {
  //       try {
  //         const transaction = new Transaction().add(
  //           createAssociatedTokenAccountInstruction(
  //             publicKey,
  //             associatedToken,
  //             id,
  //             NATIVE_MINT,
  //           )
  //         )

  //         const blockHash = await connection.getLatestBlockhash()
  //         transaction.feePayer = publicKey
  //         transaction.recentBlockhash = blockHash.blockhash
  //         const signed = await signTransaction(transaction)

  //         const signature = await connection.sendRawTransaction(signed.serialize())

  //         await connection.confirmTransaction({
  //           blockhash: blockHash.blockhash,
  //           lastValidBlockHeight: blockHash.lastValidBlockHeight,
  //           signature,
  //         })
  //         console.log("🚀 ~ getOrCreateATA ~ signature:", signature)
  //       } catch (error: unknown) {
  //         console.log(error);
  //       }
  //       account = await getAccount(connection, associatedToken, commitmentLevel);
  //     } else {
  //       throw error;
  //     }
  //   }
  //   return account;
  // }

  const buyNft = async () => {

    const portfolioCollection = await getCollectionAddresses();
    // console.log("🚀 ~ buyNftByToken ~ masterEditionAccountAddress:", portfolioCollection.masterEditionAccountAddress.toBase58());
    // console.log("🚀 ~ buyNftByToken ~ metadataAccountAddress:", portfolioCollection.metadataAccountAddress.toBase58());
    // console.log("🚀 ~ buyNftByToken ~ onchainDataAddress:", portfolioCollection.onchainDataAddress.toBase58());
    // console.log("🚀 ~ buyNftByToken ~ tokenAccount:", portfolioCollection.tokenAccount.toBase58());

    // const balance = await connection.getBalance(new PublicKey(
    //   "EVuFDMrBNHujcNtWyv8tsuHjSxdMbp78jPERTqhB4wxp"
    // ))
    // console.log("🚀 ~ buyNft ~ balance:", balance)

    const programATA = await getOrCreateATA(ProgramId, NATIVE_MINT, publicKey, signTransaction);
    console.log("🚀 ~ buyNft ~ programATA:", programATA.address.toBase58())
    const userATA = await getOrCreateATA(publicKey, NATIVE_MINT, publicKey, signTransaction);
    console.log("🚀 ~ buyNft ~ userATA:", userATA.address.toBase58())
    const balance = await connection.getBalance(userATA.address);
    console.log("🚀 ~ buyNft ~ balance:", balance)
    const nft_id = 2;

    const nft = await getNftAddresses(portfolioCollection.tokenAccount, nft_id);
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

        

       await program.methods.buyPortfolio(
        nft_id,
        collection_data.uri,
        100000n,
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
        .rpc().catch(e => console.error(e));
    }

    return { buyNft }
  }