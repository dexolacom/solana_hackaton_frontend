import { PublicKey } from '@solana/web3.js';
import { TOKEN_METADATA_PROGRAM_ID } from "@/lib/blockchain/constant";
import { getAssociatedTokenAddress } from "@solana/spl-token";

interface GetNftAddressesArgs {
  collection: PublicKey; 
  nftId: number;
  owner: PublicKey;
  programId: PublicKey;
}

export const getNftAddresses = async ({collection, nftId, owner, programId}: GetNftAddressesArgs) => {
  const associatedTokenAccount = PublicKey.findProgramAddressSync(
    [
      Buffer.from("token"),
      collection.toBuffer(),
      Buffer.from([nftId])
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

  const nftATA = await getAssociatedTokenAddress(
    associatedTokenAccount,
    owner
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