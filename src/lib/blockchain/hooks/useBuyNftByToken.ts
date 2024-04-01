import { Program, AnchorProvider, web3 } from '@project-serum/anchor'
import { } from '@solana/web3.js'

import {
  Account, createAssociatedTokenAccountInstruction, TokenInvalidAccountOwnerError, TokenAccountNotFoundError, ACCOUNT_SIZE, createInitializeAccountInstruction, getMinimumBalanceForRentExemptAccount, AccountLayout, createMint, createAccount, getAccount, getOrCreateAssociatedTokenAccount, transfer, mintTo, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, createWrappedNativeAccount, NATIVE_MINT, getAssociatedTokenAddress, createAssociatedTokenAccount
} from "@solana/spl-token";

import { Transaction, Keypair, PublicKey, SystemProgram, ComputeBudgetProgram } from '@solana/web3.js';
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { BN } from '@project-serum/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { ProgramType } from '@/lib/blockchain/types'
import { commitmentLevel, ProgramId, ProgramInterface } from '@/lib/blockchain/constant'
import * as bs58 from "bs58";
import { createTransferInstruction, createTransferCheckedInstruction } from '@solana/spl-token';


export const useBuyNftByToken = () => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet()

  if (!wallet || !publicKey || !signTransaction) return { buyNftByToken: () => { }, sendUSDC: () => { } };

  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: commitmentLevel,
  })

  const program = new Program(ProgramInterface, ProgramId, provider) as Program<ProgramType>

  // const usdtPublicKey = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');
  const usdtPublicKey = new PublicKey('BRjpCHtyQLNCo8gqRUr8jtdAj5AjPYQaoqbvcZiHok1k');

  // const mintUsdtPublicKey = new PublicKey('GrNg1XM2ctzeE2mXxXCfhcTUbejM8Z4z4wNVTy2FjMEz');
  const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  );

  const collection_data = {
    title: "Portfolio#1",
    symbol: "PRT1",
    uri: "https://raw.githubusercontent.com/Coding-and-Crypto/Solana-NFT-Marketplace/master/assets/example.json"
  }

  const feePayer = Keypair.fromSecretKey(
    bs58.decode("mLLd2nBYkZL2gLVmQvtzn6v61FM6bFPqnFBqvZsSSeDbUkerH5eSDeToCLJ1JTQa32qJ3siCw7xfq5sW6dApmmW")
  );

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

  const getOrCreateATA = async (id: PublicKey) => {
    const associatedToken = await getAssociatedTokenAddress(
      usdtPublicKey,
      id,
      false
    );

    //associatedToken program: 7WpVkVPAEWu7peoLPdGsUL65mVepjJwMhESh6NnSChih
    //associatedToken user: CVvVcq44DFpZu9J86WcjUnzmQGoxqGAWaPXoZvC7qWod

    let account: Account;
    try {
      account = await getAccount(connection, associatedToken, commitmentLevel);
    } catch (error: unknown) {
      if (error instanceof TokenAccountNotFoundError || error instanceof TokenInvalidAccountOwnerError) {
        try {
          const transaction = new Transaction().add(

            createAssociatedTokenAccountInstruction(
              publicKey,
              associatedToken,
              id,
              usdtPublicKey,
            )
          )

          const blockHash = await connection.getLatestBlockhash()
          transaction.feePayer = publicKey
          transaction.recentBlockhash = blockHash.blockhash
          const signed = await signTransaction(transaction)

          const signature = await connection.sendRawTransaction(signed.serialize())
          console.log("🚀 ~ getOrCreateATA ~ signature:", signature)

          // await connection.confirmTransaction(signature)
          await connection.confirmTransaction({
            blockhash: blockHash.blockhash,
            lastValidBlockHeight: blockHash.lastValidBlockHeight,
            signature,
          })

          // const instruction = createAssociatedTokenAccountInstruction(
          //   publicKey,
          //   associatedToken,
          //   publicKey,
          //   usdtPublicKey
          // )
          // const transaction = new Transaction().add(instruction);
          // const signature = await sendTransaction(transaction, connection);
          // const signature = await connection.sendTransaction(transaction, [feePayer]);
          console.log("🚀 ~ getOrCreateATA ~ signature:", signature)
        } catch (error: unknown) {
          console.log(error);
        }
        account = await getAccount(connection, associatedToken, commitmentLevel);
      } else {
        throw error;
      }
    }
    return account;
  }

  const sendUSDC = async () => {
    const userATA = await getOrCreateATA(publicKey);
    const toPublicKey = new PublicKey('2mxosq2T98t7dvigPcZENkjNK93JfZhU9MZzMAfD5XWN')
    const transaction = new Transaction().add(
      createTransferCheckedInstruction(
        publicKey,
        userATA,
        publicKey,
        1000000,
        6
      ));

    const blockHash = await connection.getLatestBlockhash()
    transaction.feePayer = publicKey
    transaction.recentBlockhash = blockHash.blockhash
    const signed = await signTransaction(transaction)

    const signature = await connection.sendRawTransaction(signed.serialize())
    console.log("🚀 ~ sendUSDC ~ signature:", signature)

    await connection.confirmTransaction({
      blockhash: blockHash.blockhash,
      lastValidBlockHeight: blockHash.lastValidBlockHeight,
      signature,
    });

  }

  const buyNftByToken = async () => {

    const portfolioCollection = await getCollectionAddresses();

    // console.log("🚀 ~ buyNftByToken ~ masterEditionAccountAddress:", portfolioCollection.masterEditionAccountAddress.toBase58());
    // console.log("🚀 ~ buyNftByToken ~ metadataAccountAddress:", portfolioCollection.metadataAccountAddress.toBase58());
    // console.log("🚀 ~ buyNftByToken ~ onchainDataAddress:", portfolioCollection.onchainDataAddress.toBase58());
    // console.log("🚀 ~ buyNftByToken ~ tokenAccount:", portfolioCollection.tokenAccount.toBase58());

    const userATA = await getOrCreateATA(publicKey);
    console.log("🚀 ~ buyNftByToken ~ userATA:", userATA.address.toBase58())
    const programATA = await getOrCreateATA(ProgramId);
    console.log("🚀 ~ buyNftByToken ~ programATA:", programATA.address.toBase58())

    // const userTokenAccount2 = await provider.connection.getTokenAccountBalance(userATA.address);
    // console.log("🚀 ~ buyNftByToken ~ userTokenAccount2:", userTokenAccount2)
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
      new BN(1000000),
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
        paymentToken: usdtPublicKey,
        mplProgram: TOKEN_METADATA_PROGRAM_ID,
        sysvarInstructions: web3.SYSVAR_INSTRUCTIONS_PUBKEY,
        paymentUserTokenAccount: userATA.address,
        paymentProgramTokenAccount: programATA.address,
        splAtaProgram: ASSOCIATED_TOKEN_PROGRAM_ID
      }).preInstructions([additionalComputeBudgetInstruction]).rpc()


    // const accounts = await provider.connection.getTokenAccountsByOwner(publicKey, {
    //   programId: TOKEN_PROGRAM_ID
    // });

    // console.log(accounts)

    // const userTokenAccount2 = await provider.connection.getTokenAccountBalance(userATA.address);
    // console.log(userTokenAccount2)
    // const programTokenAccount2 = await provider.connection.getTokenAccountBalance(programATA.address);
    // console.log(programTokenAccount2)

  }
  return { buyNftByToken, sendUSDC }
}