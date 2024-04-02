import { useState } from 'react';
import { PublicKey } from "@solana/web3.js";
import {
  createTransferCheckedInstruction,
  getAssociatedTokenAddress
} from "@solana/spl-token";
import { getOrCreateATA } from "../helpers/getOrCreateATA";
import { useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from '@solana/web3.js';
import { connection } from "../constant";
import { useToast } from "@/lib/hooks/useToast";
interface TransferNftProps {
  destinationAddress: PublicKey;
  mintPubkey: PublicKey;
}

export const useTransferNft = () => {
  const wallet = useWallet();
  const { toast } = useToast();
  const { publicKey, signTransaction } = wallet;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const transferNft = async ({ destinationAddress, mintPubkey }: TransferNftProps) => {

    if (!publicKey || !signTransaction) {
      toast({
        title: 'Error!',
        description: 'Please, connect wallet'
      });
      return;
    }

    try {
      setIsError(false);
      setIsSuccess(false);
      setIsLoading(true);

      const nftATA = await getAssociatedTokenAddress(
        mintPubkey,
        publicKey
      );

      const destinationATA = await getOrCreateATA({ owner: destinationAddress, mint: mintPubkey, payer: publicKey, signTransaction });

      const transaction = new Transaction();
      transaction.add(
        createTransferCheckedInstruction(
          nftATA,
          mintPubkey,
          destinationATA.address,
          publicKey,
          1,
          0
        )
      );
      const blockHash = await connection.getLatestBlockhash()
      transaction.feePayer = publicKey
      transaction.recentBlockhash = blockHash.blockhash
      const signed = await signTransaction(transaction)

      const signature = await connection.sendRawTransaction(signed.serialize())

      await connection.confirmTransaction({
        blockhash: blockHash.blockhash,
        lastValidBlockHeight: blockHash.lastValidBlockHeight,
        signature,
      })
    }
    catch {
      setIsError(true);
      setIsLoading(false);
      setIsSuccess(false);
    }
  }
  return { transferNft, isLoading, isSuccess, isError };
}


// const myKeypair = umi.eddsa.createKeypairFromSecretKey(Buffer.from("mLLd2nBYkZL2gLVmQvtzn6v61FM6bFPqnFBqvZsSSeDbUkerH5eSDeToCLJ1JTQa32qJ3siCw7xfq5sW6dApmmW"));
// const mySinger = createSignerFromKeypair(umi, myKeypair);

//  const feePayer = Keypair.fromSecretKey(
//     bs58.decode("mLLd2nBYkZL2gLVmQvtzn6v61FM6bFPqnFBqvZsSSeDbUkerH5eSDeToCLJ1JTQa32qJ3siCw7xfq5sW6dApmmW")
//   );

// import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
// import { transferV1, TokenStandard } from '@metaplex-foundation/mpl-token-metadata';
// import { publicKey as createPubKey, generateSigner } from '@metaplex-foundation/umi';
// import { umi } from "../constant";

// umi.use(walletAdapterIdentity(wallet));
// const currentOwner = generateSigner(umi);
// console.log("🚀 ~ transferNft ~ currentOwner:", currentOwner)
// console.log("🚀 ~ transferNft ~ umi:", umi)
// console.log("🚀 ~ transferNft ~ currentOwner:", currentOwner)
// await transferV1(umi, {
//   mint: createPubKey(mintPubkey.toBase58()),
//   authority: currentOwner,
//   tokenOwner: currentOwner.publicKey,
//   destinationOwner: createPubKey(destinationATA.address.toBase58()),
//   tokenStandard: TokenStandard.NonFungible,
// }).sendAndConfirm(umi)