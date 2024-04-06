// import { useProgramContext } from "@/providers/ProgramProvider/ProgramProvider";
// import { classicProgramId } from "../constant";
// import { getCollectionAddresses } from "../helpers/getCollectionAddresses";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { useToast } from "@/lib/hooks/useToast";

// interface UseBurnPortfolioArgs {
//   portfolioId: number;
//   nftId: number;
// }

// export const useBurnPortfolio = ({portfolioId, nftId}: UseBurnPortfolioArgs) => {
//   const { classicProgram, ecosystemProgram } = useProgramContext();
//   const { publicKey, signTransaction } = useWallet();
//   const { toast } = useToast();

//   const burn = async() => {

//     if (!publicKey || !ecosystemProgram || !classicProgram || !signTransaction) {
//       const error = new Error('Please, connect wallet.');
//       toast({
//         title: 'Error!',
//         description: error.message
//       });
//       return
//     }

//     const portfolioCollection = getCollectionAddresses(classicProgramId, portfolioId);
//   }

//     const nft = getNftAddresses(portfolio_collection.collection_mint, nft_id, users[1].publicKey);
//     const deser = getMetadataAccountDataSerializer();
//     const atasInstructions = []
//     const atas = []

//     for (const token of portfolioTokens) {
//       const userAta = getAssociatedTokenAddressSync(
//         token.key,
//         users[1].publicKey,
//         true,
//         TOKEN_PROGRAM_ID,
//         ASSOCIATED_TOKEN_PROGRAM_ID
//       );

//       const portfolioAta = getAssociatedTokenAddressSync(
//         token.key,
//         nft.nft_mint,
//         true,
//         TOKEN_PROGRAM_ID,
//         ASSOCIATED_TOKEN_PROGRAM_ID
//       );

//       atasInstructions.push(
//         createAssociatedTokenAccountInstruction(
//           users[1].publicKey,
//           userAta,
//           users[1].publicKey,
//           token.key,
//           TOKEN_PROGRAM_ID,
//           ASSOCIATED_TOKEN_PROGRAM_ID
//         )
//       );
//       atas.push(portfolioAta);
//       atas.push(userAta);
//     }

//     const additionalComputeBudgetInstruction =
//       ComputeBudgetProgram.setComputeUnitLimit({
//         units: 200000,
//       });
//     await createAndSendV0Tx(atasInstructions, users[1])


//     console.log(await provider.connection.getAccountInfo(nft.nft_metadata));
//     console.log(await provider.connection.getAccountInfo(nft.nft_mint));
//     console.log(await provider.connection.getAccountInfo(nft.nft_ata));
//     console.log(await provider.connection.getAccountInfo(nft.nft_record));
//     console.log(await provider.connection.getAccountInfo(nft.nft_master_edition));


//     // for (const acc of accs) {
//     //   console.log(await provider.connection.getAccountInfo(acc))
//     // }

//     const instruction = await program.methods.burnPortfolio(nft_id).accounts({
//       treasuryAta: treasury_ata_sol,
//       config: config_address,
//       payer: users[1].publicKey,
//       collection: portfolio_collection.collection_mint,
//       collectionMetadata: portfolio_collection.collection_metadata,
//       collectionMasterEdition: portfolio_collection.collection_master_edition,
//       collectionOnchaindata: portfolio_collection.collection_onchain_data,
//       tokenMint: nft.nft_mint,
//       nftUserTokenAccount: nft.nft_ata,
//       nftRecord: nft.nft_record,
//       metadataAccount: nft.nft_metadata,
//       masterEditionAccount: nft.nft_master_edition,
//       mplProgram: TOKEN_METADATA_PROGRAM_ID,
//       sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
//       splAtaProgram: ASSOCIATED_TOKEN_PROGRAM_ID
//     }).signers([users[1]])
//       .remainingAccounts(atas.map(e => {
//         return { pubkey: e, isSigner: false, isWritable: true };
//       })).instruction()

//     await createAndSendV0Tx(
//       [
//         additionalComputeBudgetInstruction,
//         instruction
//       ],
//       users[1],
//       portfolio_lookup_table
//     )

//     for (const ata of atas) {
//       // console.log()
//       try {
//         await provider.connection.getTokenAccountBalance(ata);
//         assert.fail('shoud faild bcs ata doesnt exists');
//       } catch (e) {
//         const error = e as Error;
//         assert.match(error.message, /could not find account/); // SqrtPriceOutOfBounds
//       }
//     }

//     const d2 = await provider.connection.getAccountInfo(portfolio_collection.collection_metadata);

//     // deser.de
//     console.log(deser.deserialize(d2.data)[0].collectionDetails)

//   })
// }