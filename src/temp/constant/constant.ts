import idl from './idl.json'
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'

/* Constants for RPC Connection the Solana Blockchain */
export const commitmentLevel = 'confirmed'
export const endpoint =
  'https://solana-devnet.g.alchemy.com/v2/VERaxcMMFR84w2yCPfcC3zncSv4Nwegn' || clusterApiUrl('devnet')
export const connection = new Connection(endpoint, commitmentLevel)

/* Constants for the Deployed */
export const ProgramId = new PublicKey(idl.metadata.address)
export const ProgramInterface = JSON.parse(JSON.stringify(idl))
