import { Program } from '@coral-xyz/anchor';
import { Biscuit } from '../artifacts';
import { PublicKey, SYSVAR_INSTRUCTIONS_PUBKEY, TransactionInstruction } from '@solana/web3.js';
import { BISCUIT_VAULT, TOKEN_METADATA_PROGRAM_ID } from '../constants';
import { getPortfolioCollectionAddresses } from '../collection';
import { getPortfolioAddresses } from '../portfolio';
import {
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID
} from '@solana/spl-token';

/**
 * Receive a portfolio
 * @name receivePortfolioInstruction
 * @param {Program<Biscuit>} program - Anchor program
 * @param {number} portfolio_id - Portfolio id
 * @param {number} collection_id - Collection id
 * @param {PublicKey} user - User's public key
 **/
export async function getReceivePortfolioInstruction(
  program: Program<Biscuit>,
  portfolio_id: number,
  collection_id: number,
  user: PublicKey,
  createAtaForUser: boolean = false
) {
  const portfolio_collection = getPortfolioCollectionAddresses(collection_id);
  const portfolio = getPortfolioAddresses(portfolio_collection.collection, portfolio_id, user);

  const vaultAccount = getAssociatedTokenAddressSync(portfolio.mint, BISCUIT_VAULT, true);

  const receiverAccount = getAssociatedTokenAddressSync(portfolio.mint, user, false);

  const instructions: TransactionInstruction[] = [];

  if (createAtaForUser) {
    instructions.push(createAssociatedTokenAccountInstruction(user, receiverAccount, user, portfolio.mint));
  }

  instructions.push(
    await program.methods
      .receivePortfolio(portfolio_id, collection_id)
      .accounts({
        payer: user,
        vault: BISCUIT_VAULT,
        vaultAccount: vaultAccount,
        collectionMetadata: portfolio_collection.metadata,
        collectionMasterEdition: portfolio_collection.masterEdition,
        collection: portfolio_collection.collection,
        collectionOnchaindata: portfolio_collection.collectionOnchaindata,
        mint: portfolio.mint,
        metadata: portfolio.metadata,
        portfolioData: portfolio.portfolioData,
        receiverAccount: receiverAccount,
        mplProgram: TOKEN_METADATA_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        sysvarInstructions: SYSVAR_INSTRUCTIONS_PUBKEY
      })
      .instruction()
  );

  return instructions;
}
