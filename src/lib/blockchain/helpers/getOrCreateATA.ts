import {
  Account,
  createAssociatedTokenAccountInstruction,
  TokenInvalidAccountOwnerError,
  TokenAccountNotFoundError,
  getAccount,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { Transaction, PublicKey } from '@solana/web3.js';
import { connection, commitmentLevel } from '@/lib/blockchain/constant'

export const getOrCreateATA = async (owner: PublicKey, mint: PublicKey, payer: PublicKey, signTransaction: (<T extends Transaction >(transaction: T) => Promise<T>)) => {
  const associatedToken = await getAssociatedTokenAddress(
    mint,
    owner,
    false
  );

  let account: Account;
  try {
    account = await getAccount(connection, associatedToken, commitmentLevel);

  } catch (error: unknown) {
    if (error instanceof TokenAccountNotFoundError || error instanceof TokenInvalidAccountOwnerError) {
      try {
        const transaction = new Transaction().add(
          createAssociatedTokenAccountInstruction(
            payer,
            associatedToken,
            owner,
            mint,
          )
        )

        const blockHash = await connection.getLatestBlockhash()
        transaction.feePayer = payer
        transaction.recentBlockhash = blockHash.blockhash
        const signed = await signTransaction(transaction)

        const signature = await connection.sendRawTransaction(signed.serialize())

        await connection.confirmTransaction({
          blockhash: blockHash.blockhash,
          lastValidBlockHeight: blockHash.lastValidBlockHeight,
          signature,
        })
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