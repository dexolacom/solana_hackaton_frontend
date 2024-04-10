import {
  ORCA_WHIRLPOOL_PROGRAM_ID,
  PDAUtil, SwapUtils,
} from "@orca-so/whirlpools-sdk"
import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { useProgramContext } from "@/providers/ProgramProvider/ProgramProvider";

export const useWhirpool = () => {
  const { whirlpool: whirlpoolCtx } = useProgramContext();

  const getWhirlpool = async (
    whirlpool_pubkey: PublicKey,
    amount: BN,
    invert: boolean) => {
    if (!whirlpoolCtx) {
      throw new Error('whirlpool Error');
    }

    const fetcher = whirlpoolCtx.fetcher;
    const whirlpool_oracle_pubkey = PDAUtil.getOracle(ORCA_WHIRLPOOL_PROGRAM_ID, whirlpool_pubkey).publicKey;
    const whirlpool = await fetcher.getPool(whirlpool_pubkey);
    if (!whirlpool) {
      throw new Error('Invalid pool');
    }

    const otherAmountThreshold = new BN(0);
    const amountSpecifiedIsInput = true;
    const aToB = !invert;
    const sqrtPriceLimit = SwapUtils.getDefaultSqrtPriceLimit(aToB);

    const tickarrays = SwapUtils.getTickArrayPublicKeys(
      whirlpool.tickCurrentIndex,
      whirlpool.tickSpacing,
      aToB,
      ORCA_WHIRLPOOL_PROGRAM_ID,
      whirlpool_pubkey
    );

    const args = {
      amount: amount,
      otherAmountThreshold,
      sqrtPriceLimit,
      amountSpecifiedIsInput,
      aToB,
    }

    const accounts = {
      whirlpool: whirlpool_pubkey,
      tokenVaultA: whirlpool.tokenVaultA,
      tokenVaultB: whirlpool.tokenVaultB,
      tickArray0: tickarrays[0],
      tickArray1: tickarrays[1],
      tickArray2: tickarrays[2],
      oracle: whirlpool_oracle_pubkey,
    }

    return { args, accounts };
  }

  return { getWhirlpool };
} 
