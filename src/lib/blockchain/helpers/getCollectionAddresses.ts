import { PublicKey} from '@solana/web3.js';
import { TOKEN_METADATA_PROGRAM_ID } from "@/lib/blockchain/constant";

export const getCollectionAddresses = async (programId: PublicKey) => {
  const associatedTokenAccount = PublicKey.findProgramAddressSync(
    [
      Buffer.from("collection")
    ],
    programId
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
    programId
  )[0]

  return {
    tokenAccount: associatedTokenAccount,
    metadataAccountAddress,
    masterEditionAccountAddress,
    onchainDataAddress
  }
}