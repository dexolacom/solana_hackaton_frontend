import {
  programId,
  TOKEN_METADATA_PROGRAM_ID,
  // addressClassicCollection,
  classicPotrfolioId,
  // ecosystemPortfolioId,
} from "@/lib/blockchain/constant";
import { getCoinData } from "../helpers/getCoinData";
import { useToast } from "@/lib/hooks/useToast";
import { useProgramContext } from "@/providers/ProgramProvider/ProgramProvider";
import { web3 } from "@coral-xyz/anchor";
import { BN } from '@project-serum/anchor';
import { ASSOCIATED_TOKEN_PROGRAM_ID, } from "@solana/spl-token";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { ComputeBudgetProgram, PublicKey } from '@solana/web3.js';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateColectionData } from "../helpers/generateColectionData";
import { getCollectionAddresses } from "../helpers/getCollectionAddresses";
import { getNftAddresses } from "../helpers/getNftAddresses";
import { getOrCreateATA } from "../helpers/getOrCreateATA";
import { useModalsContext } from "@/providers/ModalProvider/ModalProvider";
import { ORCA_WHIRLPOOL_PROGRAM_ID } from "@orca-so/whirlpools-sdk";
import { usePortfolioSwapData } from "./usePortfolioSwapData";
import { classicPortfolioTokens } from "@/lib/blockchain/constant";
import { useCreateAndSendV0Tx } from "./useCreateAndSendV0Tx";
import { portfolioLookupTable } from "@/lib/blockchain/constant";
import { treasury } from "@/lib/blockchain/constant";

export interface BuyNftArgs {
  inputValue: number;
  nftId: number;
  mintCollection: string;
}

export const useBuyNftByToken = () => {

  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();
  const { program } = useProgramContext();
  const { toast } = useToast();
  const { setModalName, setNftPrice } = useModalsContext();
  const queryClient = useQueryClient();
  const { getPortfolioSwapData } = usePortfolioSwapData();
  const { createAndSendV0Tx } = useCreateAndSendV0Tx();

  const usdcData = getCoinData('USDC');
  const usdcPublicKey = new PublicKey(usdcData.mint);

  const buyNftByToken = async ({ inputValue, nftId, mintCollection }: BuyNftArgs) => {
    const collectionData = generateColectionData(mintCollection)
    // const isClassicCollection = mintCollection === addressClassicCollection;
    if (!publicKey || !program || !signTransaction) {
      const error = new Error('Please, connect wallet.');
      toast({
        title: 'Error!',
        description: error.message
      });
      return
    }

    // const selectPortfolioId = isClassicCollection ? classicPotrfolioId : ecosystemPortfolioId;
    const selectPortfolioId = classicPotrfolioId;

    const configAddress = PublicKey.findProgramAddressSync(
      [
        Buffer.from("config"),
      ],
      programId
    )[0];

    const {
      collectionMint,
      collectionMetadata,
      collectionMasterEdition,
      onchainCollectionData
    } = await getCollectionAddresses(selectPortfolioId);
      // console.log("🚀 ~ buyNftByToken ~ onchainCollectionData:", onchainCollectionData.toBase58())
      // console.log("🚀 ~ buyNftByToken ~ collectionMasterEdition:", collectionMasterEdition.toBase58())
      // console.log("🚀 ~ buyNftByToken ~ collectionMetadata:", collectionMetadata.toBase58())
      // console.log("🚀 ~ buyNftByToken ~ collectionMint:", collectionMint.toBase58())

    // const slot = await connection.getSlot() - 1;

    // const [lookupTableInst, lookupTableAddress] =

    //    web3.AddressLookupTableProgram.createLookupTable({
    //         authority: publicKey,
    //         payer: publicKey,
    //         recentSlot: slot,
    //     });
    //     console.log("🚀 ~ buyNftByToken ~ lookupTableAddress:", lookupTableAddress)

    //    const transaction =new Transaction()
    //    transaction.add(lookupTableInst)
    //     sendTransaction(transaction, connection);
 

    const userATA = await getOrCreateATA({ owner: publicKey, mint: usdcPublicKey, payer: publicKey, signTransaction });
    // const programATA = await getOrCreateATA({ owner: selectProgramId, mint: usdcPublicKey, payer: publicKey, signTransaction });
    const treasuryATA = await getOrCreateATA({ owner: treasury, mint: usdcPublicKey, payer: publicKey, signTransaction });
   
    const getBalance = await connection.getTokenAccountBalance(userATA.address);
    const usdcBalance = getBalance?.value.uiAmount;

    if (!usdcBalance || usdcBalance < inputValue) {
      const error = new Error('Your USDC account balance is not enough.');
      toast({
        title: 'Error!',
        description: error.message
      });
      throw error;
    }

    const {
      nftMint,
      nftMetaData,
      nftMasterEdition,
      // onchainNftData,
      nftATA,
      nftRecord
    } = await getNftAddresses({
      collection: collectionMint,
      nftId,
      owner: publicKey,
    });

    const wrpool = await getPortfolioSwapData(publicKey, new BN(inputValue), usdcPublicKey, classicPortfolioTokens, nftMint);

    const additionalComputeBudgetInstruction =
      ComputeBudgetProgram.setComputeUnitLimit({
        units: 600000,
      });

    // const test = [
    //   treasuryAta,
    //   configAddress,
    //   userATA.address,
    //   nftMint,
    //   nftATA,
    //   nftRecord,
    //   nftMetaData,
    //   nftMasterEdition,
    // ]
  //   await createAndSendV0Tx(wrpool.instructionsForAta);

  //       const extendInstruction = web3.AddressLookupTableProgram.extendLookupTable({
  //     payer: publicKey,
  //     authority: publicKey,
  //     lookupTable: new PublicKey("HjKTcMNmExUTbmSrPGDLRgriw6GqQgVXNNKKK2RzxAfv"),
  //     addresses: [
  //         ...wrpool.ata,
  //     ]
  // });


  //   await createAndSendV0Tx([extendInstruction])

    // const selectProgram = mintCollection === addressClassicCollection ? classicProgram : ecosystemProgram

    const instruction = await program.methods.buyPortfolio(
      nftId,
      classicPotrfolioId,
      collectionData.uri,
      new BN(inputValue * usdcData.decimals),
      wrpool.args.otherAmountThreshold,
      wrpool.args.sqrtPriceLimit,
      wrpool.args.amountSpecifiedIsInput,
      wrpool.args.aToB
    )
      .accounts({
        treasuryAta: treasuryATA.address,
        config: configAddress,
        payer: publicKey,
        paymentTokenAccount: userATA.address,
        collection: collectionMint,
        collectionMetadata: collectionMetadata,
        collectionMasterEdition: collectionMasterEdition,
        collectionOnchaindata: onchainCollectionData,
        tokenMint: nftMint,
        nftUserTokenAccount: nftATA,
        nftRecord: nftRecord,
        metadataAccount: nftMetaData,
        masterEditionAccount: nftMasterEdition,
        whirlpoolProgram: ORCA_WHIRLPOOL_PROGRAM_ID,
        mplProgram: TOKEN_METADATA_PROGRAM_ID,
        sysvarInstructions: web3.SYSVAR_INSTRUCTIONS_PUBKEY,
        splAtaProgram: ASSOCIATED_TOKEN_PROGRAM_ID
      }).
      remainingAccounts(wrpool.accounts.map(e => {
        return { pubkey: e, isSigner: false, isWritable: true };
      })).instruction()

    // console.log(instruction)
    await createAndSendV0Tx(
      [
        additionalComputeBudgetInstruction,
        instruction
      ],
      [portfolioLookupTable, new PublicKey("HjKTcMNmExUTbmSrPGDLRgriw6GqQgVXNNKKK2RzxAfv")]
    )

    // for (const ata of wrpool.ata) {
    //   console.log(await connection.getTokenAccountBalance(ata))
    // }

    // const d2 = await connection.getAccountInfo(collectionMetadata);

    // deser.de
    // console.log(deser.deserialize(d2.data)[0].collectionDetails)


    // await selectProgram.methods.buyPortfolio(
    //   nftId,
    //   collectionData.uri,
    //   new BN(inputValue * usdcData.decimals),
    // )
    //   .accounts({
    //     payer: publicKey,
    //     nftUserTokenAccount: nftATA,
    //     nftRecord: nftRecord,
    //     portfolioData: onchainNftData,
    //     tokenMint: nftMint,
    //     metadataAccount: nftMetaData,
    //     masterEditionAccount: nftMasterEdition,
    //     collectionMetadata: onchainCollectionData,
    //     collection: collectionMint,
    //     paymentToken: usdcPublicKey,
    //     mplProgram: TOKEN_METADATA_PROGRAM_ID,
    //     sysvarInstructions: web3.SYSVAR_INSTRUCTIONS_PUBKEY,
    //     paymentUserTokenAccount: userATA.address,
    //     paymentProgramTokenAccount: programATA.address,
    //     splAtaProgram: ASSOCIATED_TOKEN_PROGRAM_ID
    //   }).preInstructions([additionalComputeBudgetInstruction]).rpc()

    setNftPrice(`${inputValue} USDC`);
  }

  const { mutate: buy, isError, isSuccess, isPending: isLoading } = useMutation({
    mutationFn: buyNftByToken,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['getNfts'] });
        setModalName('INVEST');
      }, 3000);
    },
    onError: (error) => {
      console.log(error);
      (error instanceof Error) ?
        toast({
          title: 'Error',
          description: error.message,
        })
        :
        toast({
          title: 'Error',
          description: 'Unsuccessful operation',
        });
    }
  })

  return { buy, isError, isSuccess, isLoading }
}