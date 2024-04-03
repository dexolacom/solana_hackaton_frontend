import { useToast } from "@/lib/hooks/useToast";
import {
  createTransferCheckedInstruction,
  getAssociatedTokenAddress
} from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { connection } from "../constant";
import { getOrCreateATA } from "../helpers/getOrCreateATA";
interface TransferNftProps {
  destinationAddress: PublicKey;
  mintPubkey: PublicKey;
}

export const useTransferNft = () => {
  const wallet = useWallet();
  const { toast } = useToast();
  const { publicKey, signTransaction } = wallet;

  const queryClient = useQueryClient();

  const transferNft = async ({ destinationAddress, mintPubkey }: TransferNftProps) => {

    if (!publicKey || !signTransaction) {
      toast({
        title: 'Error!',
        description: 'Please, connect wallet'
      });
      return;
    }

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

  const { mutate: transfer, isError, isSuccess, isPending: isLoading } = useMutation({
    mutationFn: transferNft,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getNfts'] })
    },
  })

  return { transfer, isLoading, isSuccess, isError };
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