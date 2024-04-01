import { ASSOCIATED_TOKEN_PROGRAM_ID, } from "@solana/spl-token";
import { web3 } from "@coral-xyz/anchor";
import { ComputeBudgetProgram } from '@solana/web3.js';
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { TOKEN_METADATA_PROGRAM_ID } from "@/lib/blockchain/constant";
import { ProgramId } from '@/lib/blockchain/constant'
import { getOrCreateATA } from "../helpers/getOrCreateATA";
import { BN } from '@project-serum/anchor';
import { usdcPublicKey } from "@/lib/blockchain/constant";
import { useToast } from "@/lib/hooks/useToast";
import { useProgramContext } from "@/providers/ProgramProvider/ProgramProvider";
import { getCollectionAddresses } from "../helpers/getCollectionAddresses";
import { getNftAddresses } from "../helpers/getNftAddresses";

interface UseBuyNftByTokenArgs {
  inputValue: number;
  nftId: number;
}

export const useBuyNftByToken = ({inputValue, nftId}: UseBuyNftByTokenArgs) => {

  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();
  const { program } = useProgramContext();
  const { toast } = useToast();

  const collection_data = {
    title: "Portfolio#1",
    symbol: "PRT1",
    uri: "https://raw.githubusercontent.com/Coding-and-Crypto/Solana-NFT-Marketplace/master/assets/example.json"
  }

  const buyNftByToken = async () => {

    if (!publicKey || !program || !signTransaction) {
      return toast({
        title: 'Error!',
        description: 'Please, connect wallet'
      })
    }

    const portfolioCollection = await getCollectionAddresses();

    // console.log("🚀 ~ buyNftByToken ~ masterEditionAccountAddress:", portfolioCollection.masterEditionAccountAddress.toBase58());
    // console.log("🚀 ~ buyNftByToken ~ metadataAccountAddress:", portfolioCollection.metadataAccountAddress.toBase58());
    // console.log("🚀 ~ buyNftByToken ~ onchainDataAddress:", portfolioCollection.onchainDataAddress.toBase58());
    // console.log("🚀 ~ buyNftByToken ~ tokenAccount:", portfolioCollection.tokenAccount.toBase58());

    const userATA = await getOrCreateATA({ owner: publicKey, mint: usdcPublicKey, payer: publicKey, signTransaction });
    console.log("🚀 ~ buyNftByToken ~ userATA:", userATA.address.toBase58());
    const programATA = await getOrCreateATA({ owner: ProgramId, mint: usdcPublicKey, payer: publicKey, signTransaction });
    console.log("🚀 ~ buyNftByToken ~ programATA:", programATA.address.toBase58());

    const getBalance = await connection.getTokenAccountBalance(userATA.address);
    const usdcBalance = getBalance?.value.uiAmount;

    if (!usdcBalance || usdcBalance < inputValue) {
      return toast({
        title: 'Error!',
        description: 'Your USDC account balance is not enough.'
      })
    }

    // const userTokenAccount2 = await provider.connection.getTokenAccountBalance(userATA.address);
    // console.log("🚀 ~ buyNftByToken ~ userTokenAccount2:", userTokenAccount2)

    const nft = await getNftAddresses({collection: portfolioCollection.tokenAccount, nftId, owner:publicKey});
    // console.log("🚀 ~ buyNftByToken ~ nftATA:", nft.nftATA.toBase58());
    // console.log("🚀 ~ buyNftByToken ~ masterEditionAccountAddress:", nft.masterEditionAccountAddress.toBase58());
    // console.log("🚀 ~ buyNftByToken ~ metadataAccountAddress:", nft.metadataAccountAddress.toBase58());
    // console.log("🚀 ~ buyNftByToken ~ nftRecord:", nft.nftRecord.toBase58());
    // console.log("🚀 ~ buyNftByToken ~ onchainDataAddress:", nft.onchainDataAddress.toBase58());
    // console.log("🚀 ~ buyNftByToken ~ tokenAccount:", nft.tokenAccount.toBase58());

    const additionalComputeBudgetInstruction =
      ComputeBudgetProgram.setComputeUnitLimit({
        units: 400000,
      });

    await program.methods.buyPortfolio(
      nftId,
      collection_data.uri,
      new BN(inputValue * 10e5),
    )
      .accounts({
        payer: publicKey,
        nftUserTokenAccount: nft.nftATA,
        nftRecord: nft.nftRecord,
        portfolioData: nft.onchainDataAddress,
        tokenMint: nft.tokenAccount,
        metadataAccount: nft.metadataAccountAddress,
        masterEditionAccount: nft.masterEditionAccountAddress,
        collectionMetadata: portfolioCollection.onchainDataAddress,
        collection: portfolioCollection.tokenAccount,
        paymentToken: usdcPublicKey,
        mplProgram: TOKEN_METADATA_PROGRAM_ID,
        sysvarInstructions: web3.SYSVAR_INSTRUCTIONS_PUBKEY,
        paymentUserTokenAccount: userATA.address,
        paymentProgramTokenAccount: programATA.address,
        splAtaProgram: ASSOCIATED_TOKEN_PROGRAM_ID
      }).preInstructions([additionalComputeBudgetInstruction]).rpc()


    // const accounts = await provider.connection.getTokenAccountsByOwner(publicKey, {
    //   programId: TOKEN_PROGRAM_ID
    // });

    // console.log(accounts)

    // const userTokenAccount2 = await provider.connection.getTokenAccountBalance(userATA.address);
    // console.log(userTokenAccount2)
    // const programTokenAccount2 = await provider.connection.getTokenAccountBalance(programATA.address);
    // console.log(programTokenAccount2)

  }
  return { buyNftByToken }
}