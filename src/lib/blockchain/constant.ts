import idl from '@/lib/blockchain/programData/idl.json'
import {clusterApiUrl, PublicKey, Connection} from '@solana/web3.js'

export const commitmentLevel = "confirmed"
export const endpoint =
  'https://solana-devnet.g.alchemy.com/v2/VERaxcMMFR84w2yCPfcC3zncSv4Nwegn' || clusterApiUrl('devnet')
export const connection = new Connection(endpoint, commitmentLevel)

export const ProgramId = new PublicKey(idl.metadata.address)
export const ProgramInterface = JSON.parse(JSON.stringify(idl))

export const addressNftCollection = 'zr24szrS9LJs37gx1rZJDiCRunsA5Cstk9yV69VbDpU';