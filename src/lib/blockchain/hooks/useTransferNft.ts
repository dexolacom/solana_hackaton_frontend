import { PublicKey } from "@solana/web3.js";
import {
  // createTransferCheckedInstruction, 
  getAssociatedTokenAddress
} from "@solana/spl-token";
// import { connection } from "../constant";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { transferV1, TokenStandard } from '@metaplex-foundation/mpl-token-metadata';
import { publicKey as createPubKey, generateSigner } from '@metaplex-foundation/umi';
import { umi } from "../constant";


import { getOrCreateATA } from "../helpers/getOrCreateATA";
import { useWallet } from "@solana/wallet-adapter-react";

interface TransferNftProps {
  destinationAddress: PublicKey;
  mintPubkey: PublicKey;
}

// const myKeypair = umi.eddsa.createKeypairFromSecretKey(Buffer.from("mLLd2nBYkZL2gLVmQvtzn6v61FM6bFPqnFBqvZsSSeDbUkerH5eSDeToCLJ1JTQa32qJ3siCw7xfq5sW6dApmmW"));
// const mySinger = createSignerFromKeypair(umi, myKeypair);

//  const feePayer = Keypair.fromSecretKey(
//     bs58.decode("mLLd2nBYkZL2gLVmQvtzn6v61FM6bFPqnFBqvZsSSeDbUkerH5eSDeToCLJ1JTQa32qJ3siCw7xfq5sW6dApmmW")
//   );

export const useTransferNft = ({ destinationAddress, mintPubkey }: TransferNftProps) => {
  const wallet = useWallet();
  const { publicKey, signTransaction } = wallet;
  wallet.signIn
  if (!publicKey || !signTransaction) return { transferNft: () => { } };
  const transferNft = async () => {
    const nftATA = await getAssociatedTokenAddress(
      mintPubkey,
      publicKey
    );
    console.log("🚀 ~ transferNft ~ nftATA:", nftATA.toBase58())
    const destinationATA = await getOrCreateATA(destinationAddress, mintPubkey, publicKey, signTransaction);
    console.log("🚀 ~ transferNft ~ destinationATA:", destinationATA.address.toBase58())
    umi.use(walletAdapterIdentity(wallet));
    const currentOwner = generateSigner(umi);
    // console.log("🚀 ~ transferNft ~ currentOwner:", currentOwner)
    // console.log("🚀 ~ transferNft ~ umi:", umi)
    // console.log("🚀 ~ transferNft ~ currentOwner:", currentOwner)
    await transferV1(umi, {
      mint: createPubKey(mintPubkey.toBase58()),
      authority: currentOwner,
      tokenOwner: currentOwner.publicKey,
      destinationOwner: createPubKey(destinationATA.address.toBase58()),
      tokenStandard: TokenStandard.NonFungible,
    }).sendAndConfirm(umi)
    // const tokenAccount2Pubkey = new PublicKey(ata);
    // const transaction = new Transaction();
    // transaction.add(

    //   createTransferCheckedInstruction(
    //     nftATA, // from
    //     mintPubkey, // mint
    //     destinationATA.address, // to
    //     publicKey, // from's owner
    //     1, // amount
    //     0 // decimals
    //   )
    // );
    // const blockHash = await connection.getLatestBlockhash()
    // transaction.feePayer = publicKey
    // transaction.recentBlockhash = blockHash.blockhash
    // const signed = await signTransaction(transaction)

    // const signature = await connection.sendRawTransaction(signed.serialize())

    // await connection.confirmTransaction({
    //   blockhash: blockHash.blockhash,
    //   lastValidBlockHeight: blockHash.lastValidBlockHeight,
    //   signature,
    // })
    // console.log("🚀 ~ getOrCreateATA ~ signature:", signature)

  }
  return { transferNft };
}