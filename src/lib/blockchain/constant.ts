import idl from '@/lib/blockchain/programData/idl.json'
import {clusterApiUrl, PublicKey, Connection} from '@solana/web3.js'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'

export const commitmentLevel = "confirmed"
export const endpoint =
'https://solana-devnet.g.alchemy.com/v2/VERaxcMMFR84w2yCPfcC3zncSv4Nwegn' || clusterApiUrl('devnet')
export const connection = new Connection(endpoint, commitmentLevel)

export const umi = createUmi(endpoint).use(mplTokenMetadata())

export const ProgramId = new PublicKey(idl.metadata.address)
export const ProgramInterface = JSON.parse(JSON.stringify(idl))

export const addressClassicCollection = 'zr24szrS9LJs37gx1rZJDiCRunsA5Cstk9yV69VbDpU'
export const addressEcosystemCollection = 'zr24szrS9LJs37gx1rZJDiCRunsA5Cstk9yV69VbgTy'

export const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
)

export const usdcAddress = 'BRjpCHtyQLNCo8gqRUr8jtdAj5AjPYQaoqbvcZiHok1k'
export const wSolAddress = 'So11111111111111111111111111111111111111112'
export const usdcPublicKey = new PublicKey(usdcAddress)
export const wSolPublicKey = new PublicKey(wSolAddress)

export const decimalsToken: Record<string, number> = {
  'USDC': 10e5,
  'SOL': 10e8
};
