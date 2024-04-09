// import {
//   classicProgramId,
//   ecosystemProgramId,
//   TOKEN_METADATA_PROGRAM_ID,
//   decimalsToken,
//   addressClassicCollection
// } from "@/lib/blockchain/constant";
// import { useToast } from "@/lib/hooks/useToast";
// import { useProgramContext } from "@/providers/ProgramProvider/ProgramProvider";
// import { web3 } from "@coral-xyz/anchor";
// import { BN } from '@project-serum/anchor';
// import {
//   ASSOCIATED_TOKEN_PROGRAM_ID,
//   NATIVE_MINT,
//   createSyncNativeInstruction,
// } from "@solana/spl-token";
// import { useConnection, useWallet } from '@solana/wallet-adapter-react';
// import { ComputeBudgetProgram, LAMPORTS_PER_SOL, SystemProgram, Transaction } from '@solana/web3.js';
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { generateColectionData } from "../helpers/generateColectionData";
// import { getCollectionAddresses } from "../helpers/getCollectionAddresses";
// import { getNftAddresses } from "../helpers/getNftAddresses";
// import { getOrCreateATA } from "../helpers/getOrCreateATA";
// import { BuyNftArgs } from "./useBuyNftByToken";
// import { useModalsContext } from "@/providers/ModalProvider/ModalProvider";

// export const useBuyNftByNative = () => {

//   const { publicKey, signTransaction, sendTransaction } = useWallet();
//   const { connection } = useConnection();
//   const { toast } = useToast();
//   const { setModalName, setNftPrice } = useModalsContext();
//   const queryClient = useQueryClient();

//   const buyNftByNative =  async ({ inputValue, nftId, mintCollection }: BuyNftArgs) => {
//     console.log("🚀 ~ buyNftByNative ~ mintCollection:", mintCollection)
//     const collectionData = generateColectionData(mintCollection)
//     const isClassicColection = mintCollection === addressClassicCollection;
    
//     if (!publicKey || !ecosystemProgram || !classicProgram || !signTransaction) {
//       const error = new Error('Please, connect wallet.');
//       toast({
//         title: 'Error!',
//         description: error.message
//       });
//       return
//     }

//     const selectProgramId = isClassicColection ? classicProgramId : ecosystemProgramId;
//     console.log("🚀 ~ buyNftByNative ~ selectProgramId:", selectProgramId)
//     const {
//       collectionMint,
//       // collectionMetadata,
//       // collectionMasterEdition,
//       onchainCollectionData
//     } = await getCollectionAddresses(selectProgramId, 1);
//     // console.log("🚀 ~ buyNftByToken ~ masterEditionAccountAddress:", portfolioCollection.masterEditionAccountAddress.toBase58());
//     // console.log("🚀 ~ buyNftByToken ~ metadataAccountAddress:", portfolioCollection.metadataAccountAddress.toBase58());
//     // console.log("🚀 ~ buyNftByToken ~ onchainDataAddress:", portfolioCollection.onchainDataAddress.toBase58());
//     // console.log("🚀 ~ buyNftByToken ~ tokenAccount:", portfolioCollection.tokenAccount.toBase58());

//     // const balance = await connection.getBalance(new PublicKey(
//     //   "EVuFDMrBNHujcNtWyv8tsuHjSxdMbp78jPERTqhB4wxp"
//     // ))
//     // console.log("🚀 ~ buyNft ~ balance:", balance)

//     const programATA = await getOrCreateATA({ owner: selectProgramId, mint: NATIVE_MINT, payer: publicKey, signTransaction });
//     const userATA = await getOrCreateATA({ owner: publicKey, mint: NATIVE_MINT, payer: publicKey, signTransaction });

//     const solbalance = await connection.getBalance(publicKey);

//     if (!solbalance || (solbalance / decimalsToken['SOL'] < inputValue)) {
//       const error = new Error('Your USDC account balance is not enough.');
//       toast({
//         title: 'Error!',
//         description: error.message
//       });
//       throw error;
//     }

//     const { 
//       nftMint,
//       nftMetaData,
//       nftMasterEdition,
//       onchainNftData,
//       nftATA,
//       nftRecord
//     } = await getNftAddresses({
//       collection: collectionMint,
//       nftId,
//       owner: publicKey,
//       programId: selectProgramId
//     });


//     // console.log("🚀 ~ buyNftByToken ~ nftATA:", nft.nftATA.toBase58());
//     // console.log("🚀 ~ buyNftByToken ~ masterEditionAccountAddress:", nft.masterEditionAccountAddress.toBase58());
//     // console.log("🚀 ~ buyNftByToken ~ metadataAccountAddress:", nft.metadataAccountAddress.toBase58());
//     // console.log("🚀 ~ buyNftByToken ~ nftRecord:", nft.nftRecord.toBase58());
//     // console.log("🚀 ~ buyNftByToken ~ onchainDataAddress:", nft.onchainDataAddress.toBase58());
//     // console.log("🚀 ~ buyNftByToken ~ tokenAccount:", nft.tokenAccount.toBase58());

//     const additionalComputeBudgetInstruction =
//       ComputeBudgetProgram.setComputeUnitLimit({
//         units: 400000,
//       });
//     // const feePayer = Keypair.fromSecretKey(
//     //   bs58.decode("mLLd2nBYkZL2gLVmQvtzn6v61FM6bFPqnFBqvZsSSeDbUkerH5eSDeToCLJ1JTQa32qJ3siCw7xfq5sW6dApmmW")
//     // );

//     const getWSolbalance = await connection.getTokenAccountBalance(userATA.address);
//     const wSolBalance = getWSolbalance?.value.uiAmount;

//     if (wSolBalance !== null && wSolBalance < inputValue) {
//       const transaction = new Transaction()
//       transaction.add(SystemProgram.transfer({
//         fromPubkey: publicKey,
//         toPubkey: userATA.address,
//         lamports: (inputValue - wSolBalance) * LAMPORTS_PER_SOL,
//       }),
//         createSyncNativeInstruction(userATA.address)
//       );
//       await sendTransaction(transaction, connection);
//       // instructions.push(refillUserATA);
//     }
//     const selectProgram = isClassicColection ? classicProgram : ecosystemProgram;
//     await selectProgram.methods.buyPortfolio(
//       nftId,
//       collectionData.uri,
//       new BN(inputValue * decimalsToken['SOL']),
//     )
//       .accounts({
//         payer: publicKey,
//         nftUserTokenAccount: nftATA,
//         nftRecord: nftRecord,
//         portfolioData: onchainNftData,
//         tokenMint: nftMint,
//         metadataAccount: nftMetaData,
//         masterEditionAccount: nftMasterEdition,
//         collectionMetadata: onchainCollectionData,
//         collection: collectionMint,
//         paymentToken: NATIVE_MINT,
//         mplProgram: TOKEN_METADATA_PROGRAM_ID,
//         sysvarInstructions: web3.SYSVAR_INSTRUCTIONS_PUBKEY,
//         paymentUserTokenAccount: userATA.address,
//         paymentProgramTokenAccount: programATA.address,
//         splAtaProgram: ASSOCIATED_TOKEN_PROGRAM_ID
//       }).preInstructions([additionalComputeBudgetInstruction])
//       .rpc()
//     setNftPrice(`${inputValue} SOL`);
//   }

//   const { mutate: buy, isError, isSuccess, isPending: isLoading } = useMutation({
//     mutationFn: buyNftByNative,
//     onSuccess: () => {
//       setTimeout(() => {
//         queryClient.invalidateQueries({ queryKey: ['getNfts'] });
//         setModalName('INVEST');
//       }, 3000);
//     },
//     onError: (error) => {
//       (error instanceof Error) ?
//       toast({
//         title: 'Error',
//         description: error.message,
//       })
//     :
//       toast({
//         title: 'Error',
//         description: 'Unsuccessful operation',
//       });
//     }
//   })

//   return { buy, isLoading, isError, isSuccess }
// }