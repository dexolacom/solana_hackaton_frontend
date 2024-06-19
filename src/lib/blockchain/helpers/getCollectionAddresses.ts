import { PublicKey } from '@solana/web3.js';
import { TOKEN_METADATA_PROGRAM_ID } from '@/lib/blockchain/constant';
import { programId } from '@/lib/blockchain/constant';

export const getCollectionAddresses = async (portfolioId: number) => {
  const collectionMint = PublicKey.findProgramAddressSync(
    [Buffer.from('collection'), programId.toBuffer(), Buffer.from([portfolioId])],
    programId
  )[0];

  const collectionMetadata = PublicKey.findProgramAddressSync(
    [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), collectionMint.toBuffer()],
    TOKEN_METADATA_PROGRAM_ID
  )[0];

  const collectionMasterEdition = PublicKey.findProgramAddressSync(
    [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), collectionMint.toBuffer(), Buffer.from('edition')],
    TOKEN_METADATA_PROGRAM_ID
  )[0];

  const onchainCollectionData = PublicKey.findProgramAddressSync(
    [Buffer.from('onchain-data'), collectionMint.toBuffer()],
    programId
  )[0];

  return {
    collectionMint,
    collectionMetadata,
    collectionMasterEdition,
    onchainCollectionData
  };
};
