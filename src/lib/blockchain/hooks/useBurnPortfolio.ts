import { useToast } from "@/lib/hooks/useToast";
import { useProgramContext } from "@/providers/ProgramProvider/ProgramProvider";
import { web3 } from "@coral-xyz/anchor";
// import { getMetadataAccountDataSerializer } from "@metaplex-foundation/mpl-token-metadata";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { ComputeBudgetProgram } from "@solana/web3.js";
import { 
  TOKEN_METADATA_PROGRAM_ID, 
  classicPortfolioTokens, 
  // programId, 
  // treasury, 
  portfolioLookupTable,
  // connection 
} from "@/lib/blockchain/constant";
// import { getCoinData } from "../helpers/getCoinData";
import { getCollectionAddresses } from "../helpers/getCollectionAddresses";
import { getNftAddresses } from "../helpers/getNftAddresses";
// import { getOrCreateATA } from "../helpers/getOrCreateATA";
import { useCreateAndSendV0Tx } from "./useCreateAndSendV0Tx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalsContext } from "@/providers/ModalProvider/ModalProvider";

interface BurnPortfolioArgs {
  portfolioId: number;
  nftId: number;
}

export const useBurnPortfolio = () => {
  const { program } = useProgramContext();
  const { publicKey, signTransaction } = useWallet();
  const { createAndSendV0Tx } = useCreateAndSendV0Tx();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { setModalName } = useModalsContext();

  const burnNft = async ({ portfolioId, nftId }: BurnPortfolioArgs) => {

    if (!publicKey || !program || !signTransaction) {
      const error = new Error('Please, connect wallet.');
      toast({
        title: 'Error!',
        description: error.message
      });
      return
    }

    const {
      collectionMint,
      collectionMetadata,
      // collectionMasterEdition,
      onchainCollectionData
    } = await getCollectionAddresses(portfolioId);

    const {
      nftMint,
      nftMetaData,
      nftMasterEdition,
      // onchainNftData,
      nftATA,
      nftRecord
    } = await getNftAddresses({ collection: collectionMint, nftId, owner: publicKey });

    // const usdcData = getCoinData('USDC');
    // const usdcPublicKey = new PublicKey(usdcData.mint);

    // const treasuryATA = await getOrCreateATA({ owner: treasury, mint: usdcPublicKey, payer: publicKey, signTransaction });
    // const deser = getMetadataAccountDataSerializer();
    // console.log("🚀 ~ burn ~ deser:", deser)

    const atasInstructions = []
    const atas = []

    // const configAddress = PublicKey.findProgramAddressSync(
    //   [
    //     Buffer.from("config"),
    //   ],
    //   programId
    // )[0];

    for (const token of classicPortfolioTokens) {
      const userATA = getAssociatedTokenAddressSync(
        token.key,
        publicKey,
        true,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      const portfolioATA = getAssociatedTokenAddressSync(
        token.key,
        nftMint,
        true,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      atasInstructions.push(
        createAssociatedTokenAccountInstruction(
          publicKey,
          userATA,
          publicKey,
          token.key,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        )
      );
      atas.push(portfolioATA);
      atas.push(userATA);
    }

    const additionalComputeBudgetInstruction =
      ComputeBudgetProgram.setComputeUnitLimit({
        units: 200000,
      });
    await createAndSendV0Tx(atasInstructions)

    // console.log(await connection.getAccountInfo(nftMetaData));
    // console.log(await connection.getAccountInfo(nftMint));
    // console.log(await connection.getAccountInfo(nftATA));
    // console.log(await connection.getAccountInfo(nftRecord));
    // console.log(await connection.getAccountInfo(nftMasterEdition));

    // for (const acc of accs) {
    //   console.log(await provider.connection.getAccountInfo(acc))
    // }

    const instruction = await program.methods.burnPortfolio(nftId).accounts({
      // treasuryAta: treasuryATA.address,  //!!!!!!!
      // config: configAddress,
      payer: publicKey,
      collection: collectionMint,
      collectionMetadata: collectionMetadata,
      // collectionMasterEdition: collectionMasterEdition,
      collectionOnchaindata: onchainCollectionData,
      tokenMint: nftMint,
      nftUserTokenAccount: nftATA,
      nftRecord: nftRecord,
      metadataAccount: nftMetaData,
      masterEditionAccount: nftMasterEdition,
      mplProgram: TOKEN_METADATA_PROGRAM_ID,
      sysvarInstructions: web3.SYSVAR_INSTRUCTIONS_PUBKEY,
      splAtaProgram: ASSOCIATED_TOKEN_PROGRAM_ID
    }).remainingAccounts(atas.map(e => {
      return { pubkey: e, isSigner: false, isWritable: true };
    })).instruction()

    await createAndSendV0Tx(
      [
        additionalComputeBudgetInstruction,
        instruction
      ],
      [portfolioLookupTable]
    )

    // for (const ata of atas) {
    //   // console.log()
    //   try {
    //     await provider.connection.getTokenAccountBalance(ata);
    //     assert.fail('shoud faild bcs ata doesnt exists');
    //   } catch (e) {
    //     const error = e as Error;
    //     assert.match(error.message, /could not find account/); // SqrtPriceOutOfBounds
    //   }
    // }

    // const d2 = await connection.getAccountInfo(collectionMetadata);

    // // deser.de
    // console.log(deser.deserialize(d2.data)[0].collectionDetails)
  }
  const { mutate: burn, isError, isSuccess, isPending: isLoading } = useMutation({
    mutationFn: burnNft,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getNfts'] });
        setModalName('');
        toast({
          title: 'Error',
          description: 'Burn success',
        });
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

  return {burn, isError, isLoading, isSuccess};
}