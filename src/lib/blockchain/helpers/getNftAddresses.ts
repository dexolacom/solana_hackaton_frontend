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
  const nftMint = PublicKey.findProgramAddressSync(
    [
      Buffer.from("token"),
      collection.toBuffer(),
      Buffer.from([nftId])
    ],
    programId
  )[0]

  const nftMetaData = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      nftMint.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  )[0]

  const nftMasterEdition = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      nftMint.toBuffer(),
      Buffer.from("edition")
    ],
    TOKEN_METADATA_PROGRAM_ID
  )[0]

  const onchainNftData = PublicKey.findProgramAddressSync(
    [
      Buffer.from("onchain-data"),
      nftMetaData.toBuffer(),
    ],
    programId
  )[0]

  const nftATA = await getAssociatedTokenAddress(
    nftMint,
    owner
  )

  const nftRecord = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      nftMint.toBuffer(),
      Buffer.from("token_record"),
      nftATA.toBuffer()
    ],
    TOKEN_METADATA_PROGRAM_ID
  )[0]

  return {
    nftMint,
    nftMetaData,
    nftMasterEdition,
    onchainNftData,
    nftATA,
    nftRecord
  }
}