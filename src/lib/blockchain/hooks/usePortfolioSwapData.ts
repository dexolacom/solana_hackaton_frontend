import { PublicKey } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';
import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction
} from '@solana/spl-token';
import { useWhirpool } from './useWhirpool';
import { WHIRLPOOLS } from '../constant';

interface ResultType {
  args: {
    amount: any[];
    otherAmountThreshold: any[];
    sqrtPriceLimit: any[];
    amountSpecifiedIsInput: any[];
    aToB: any[];
  };
  accounts: any[];
  instructionsForAta: any[];
  ata: any[];
}

export const usePortfolioSwapData = () => {
  const { getWhirlpool } = useWhirpool();

  const getPortfolioSwapData = async (
    payer: PublicKey,
    amountIn: BN,
    paymen_token: PublicKey,
    tokens_data: Array<{ key: PublicKey; percent: number }>,
    nftMint: PublicKey,
    forTableCreation = false
  ) => {
    console.log('🚀 ~ usePortfolioSwapData ~ amountIn:', amountIn);

    const result: ResultType = {
      args: {
        amount: [],
        otherAmountThreshold: [],
        sqrtPriceLimit: [],
        amountSpecifiedIsInput: [],
        aToB: []
      },
      accounts: [],
      instructionsForAta: [],
      ata: []
    };

    for (const token of tokens_data) {
      const associatedToken = getAssociatedTokenAddressSync(
        token.key,
        nftMint,
        true,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      result.instructionsForAta.push(
        createAssociatedTokenAccountInstruction(
          payer,
          associatedToken,
          nftMint,
          token.key,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        )
      );

      result.ata.push(associatedToken);

      const amount = amountIn.mul(new BN(token.percent)).div(new BN(1000));
      //@ts-ignore
      const whirlpool_pubkey = WHIRLPOOLS[paymen_token.toBase58()][token.key.toBase58()];
      const data = await getWhirlpool(whirlpool_pubkey.key, amount, whirlpool_pubkey.invert);

      if (!forTableCreation) {
        result.accounts.push(associatedToken);
      }
      result.accounts.push(data.accounts.tokenVaultA);
      result.accounts.push(data.accounts.tokenVaultB);
      result.accounts.push(data.accounts.tickArray0);
      result.accounts.push(data.accounts.tickArray1);
      result.accounts.push(data.accounts.tickArray2);
      result.accounts.push(data.accounts.oracle);
      result.accounts.push(data.accounts.whirlpool);

      for (const key in result.args) {
        if (Object.prototype.hasOwnProperty.call(result.args, key)) {
          //@ts-ignore
          result.args[key].push(data.args[key]);
        }
      }
    }

    return result;
  };

  return { getPortfolioSwapData };
};
