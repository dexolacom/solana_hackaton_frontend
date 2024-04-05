import classicIdl from '@/lib/blockchain/programData/classicIdl.json'
import ecosystemIdl from '@/lib/blockchain/programData/ecosystemIdl.json'
import {clusterApiUrl, PublicKey, Connection} from '@solana/web3.js'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'

export const commitmentLevel = "confirmed"
export const endpoint =
'https://solana-devnet.g.alchemy.com/v2/VERaxcMMFR84w2yCPfcC3zncSv4Nwegn' || clusterApiUrl('devnet')
export const connection = new Connection(endpoint, commitmentLevel)

export const umi = createUmi(endpoint).use(mplTokenMetadata())

export const classicProgramId = new PublicKey(classicIdl.metadata.address)
export const classicProgramInterface = JSON.parse(JSON.stringify(classicIdl))

export const ecosystemProgramId = new PublicKey(ecosystemIdl.metadata.address)
export const ecosystemProgramInterface = JSON.parse(JSON.stringify(ecosystemIdl))

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
