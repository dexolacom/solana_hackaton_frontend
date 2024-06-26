import { PublicKey } from '@solana/web3.js';
import { ORCA_WHIRLPOOL_PROGRAM_ID as ORCA_PROGRAM } from '@orca-so/whirlpools-sdk';

export const ORCA_WHIRLPOOL_PROGRAM_ID = ORCA_PROGRAM;

// devnet - FcrweFY1G9HJAHG5inkGB6pKg1HZ6x9UC2WioAfWrGkR
// mainnet - 2LecshUwdy9xi7meFgHtFJQNSKk4KdTrcpvaB56dP2NQ
export const ORCA_WHIRLPOOLS_CONFIG = new PublicKey('FcrweFY1G9HJAHG5inkGB6pKg1HZ6x9UC2WioAfWrGkR');

export const TOKEN_METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

export const BISCUIT_PROGRAM_ID = new PublicKey('AguvXyhZXA9WMXfezVHCnz9rjGDPRrDY6FdMcmgSaaKN');

export const TREASURY = new PublicKey('8QdnKN4JbhpSLdhJVcCswmSy3X1Z3hmyZEG3VvGGNHn7');

export const BISCUIT_CONFIG = PublicKey.findProgramAddressSync([Buffer.from('config')], BISCUIT_PROGRAM_ID)[0];

export const BISCUIT_VAULT = PublicKey.findProgramAddressSync([Buffer.from('vault')], BISCUIT_PROGRAM_ID)[0];

export enum BurnModel {
  Raw = 'Raw',
  Swap = 'Swap    '
}

export const BurnMap = {
  [BurnModel.Raw]: { raw: {} },
  [BurnModel.Swap]: { swap: {} }
};
