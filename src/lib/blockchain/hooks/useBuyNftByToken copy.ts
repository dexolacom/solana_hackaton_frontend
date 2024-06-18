import {
  programId,
  TOKEN_METADATA_PROGRAM_ID,
  connection,
  portfolioLookupTable,
  // addressClassicCollection,
  classicPotrfolioId
  // ecosystemPortfolioId,
} from '@/lib/blockchain/constant';
import { getCoinData } from '../helpers/getCoinData';
import { useToast } from '@/lib/hooks/useToast';
import { useProgramContext } from '@/providers/ProgramProvider/ProgramProvider';
import { web3 } from '@coral-xyz/anchor';
import { BN } from '@project-serum/anchor';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync
} from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import { ComputeBudgetProgram, Keypair, PublicKey, TransactionInstruction } from '@solana/web3.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { generateColectionData } from '../helpers/generateColectionData';
import { getCollectionAddresses } from '../helpers/getCollectionAddresses';
import { getNftAddresses } from '../helpers/getNftAddresses';
import { getOrCreateATA } from '../helpers/getOrCreateATA';
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider';
import { ORCA_WHIRLPOOL_PROGRAM_ID } from '@orca-so/whirlpools-sdk';
import { usePortfolioSwapData } from './usePortfolioSwapData';
import { classicPortfolioTokens } from '@/lib/blockchain/constant';
import { useCreateAndSendV0Tx } from './useCreateAndSendV0Tx';
import { portfolioLookupTable } from '@/lib/blockchain/constant';
import { treasury } from '@/lib/blockchain/constant';
import { getPortfolioAddresses } from '../programData/sdk/portfolio';
import { getPortfolioCollectionAddresses } from '../programData/sdk/collection';
import { getBuyPortfolioInstruction } from '../programData/sdk/instructions';
import { TREASURY } from '../programData/sdk';
import { coins } from '../constant';

export interface BuyNftArgs {
  inputValue: number;
  portfolioId: number;
  collectionId: number;
}

export const useBuyNftByToken = () => {
  const { publicKey, signTransaction } = useWallet();
  const { program } = useProgramContext();
  const { toast } = useToast();
  // const { setModalName, setNftPrice } = useModalsContext();
  // const queryClient = useQueryClient();
  // const { getPortfolioSwapData } = usePortfolioSwapData();
  const { createAndSendV0Tx } = useCreateAndSendV0Tx();

  const usdcData = getCoinData('USDC');
  const paymentToken = new PublicKey(usdcData.mint);
  console.log("🚀 ~ useBuyNftByToken ~ paymentToken:", paymentToken.toString())
  // const usdcPublicKey = new PublicKey(usdcData.mint);

  const buyNftByToken = async ({ inputValue, portfolioId, collectionId }: BuyNftArgs) => {
    if (!publicKey || !program || !signTransaction) {
      const error = new Error('Please, connect wallet.');
      toast({
        title: 'Error!',
        description: error.message
      });
      return;
    }
    console.log('🚀 ~ buyNftByToken ~ collectionId:', collectionId);
    console.log('🚀 ~ buyNftByToken ~ portfolioId:', portfolioId);
    console.log('🚀 ~ buyNftByToken ~ inputValue:', inputValue);

    const collectionAddress = getPortfolioCollectionAddresses(collectionId)?.collection;
    console.log('🚀 ~ buyNftByToken ~ collectionAddress:', collectionAddress);

    const amount = new BN(inputValue).mul(new BN(usdcData.decimals));

    const usdcATA = getAssociatedTokenAddressSync(new PublicKey(usdcData.mint), publicKey);

    const getBalance = await connection.getTokenAccountBalance(usdcATA);
    const usdcBalance = getBalance?.value?.uiAmount;

     if (!usdcBalance || (usdcBalance < inputValue)) {
      const error = new Error('Your USDC account balance is not enough.');
      toast({
        title: 'Error!',
        description: error.message
      });
      throw error;
    }

    console.log(generateColectionData(collectionAddress.toString()).uri);

    const additionalComputeBudgetInstruction = ComputeBudgetProgram.setComputeUnitLimit({
      units: 500000
    });

    const instruction = await getBuyPortfolioInstruction(
      program,
      portfolioId,
      collectionId,
      paymentToken,
      publicKey,
      generateColectionData(collectionAddress.toString()).uri,
      amount,
      TREASURY
    );

    await createAndSendV0Tx([additionalComputeBudgetInstruction, instruction], [portfolioLookupTable]);

   

        // expect((await provider.connection.getTokenAccountBalance(treasury_payment_token_account)).value.amount).to.be.equal('5000000');

    const portfolio = getPortfolioAddresses(collectionAddress, portfolioId, publicKey);

    // const portfolioFunds = getAssociatedTokenAddressSync(
    //     paymentToken,
    //     portfolio.mint,
    //     true
    // )
        // expect((await provider.connection.getTokenAccountBalance(portfolio_funds)).value.amount).to.be.equal('995000000');

    const instructions: TransactionInstruction[] = [];
    for (const token of coins) {
      const ata = getAssociatedTokenAddressSync(new PublicKey(token.mint), portfolio.mint, true);

      instructions.push(
        createAssociatedTokenAccountInstruction(publicKey, ata, portfolio.mint, new PublicKey(token.mint))
      );
    }

    await createAndSendV0Tx(instructions);
  }

  const buy = () => {};
  const isError = false;
  const isSuccess = false;
  const isLoading = false;

  return { buy, isError, isSuccess, isLoading, buyNftByToken };
};
