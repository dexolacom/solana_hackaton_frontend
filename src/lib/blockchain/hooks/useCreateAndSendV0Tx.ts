import { useWallet } from "@solana/wallet-adapter-react";
import { TransactionInstruction, PublicKey, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { connection } from "../constant";
import { useToast } from "@/lib/hooks/useToast";

export const useCreateAndSendV0Tx = () => {

const { publicKey, signTransaction } = useWallet();
const { toast } = useToast();


const createAndSendV0Tx = async(
  txInstructions: TransactionInstruction[],
  addressLookupTable?: PublicKey[]
) => {

  if (!publicKey || !signTransaction) {
    const error = new Error('Please, connect wallet.');
    toast({
      title: 'Error!',
      description: error.message
    });
    return
  }
  
  // Step 1 - Fetch the latest blockhash
  const latestBlockhash = await connection.getLatestBlockhash(
    "confirmed"
  );
  // console.log(
  //   "   ✅ - Fetched latest blockhash. Last Valid Height:",
  //   latestBlockhash.lastValidBlockHeight
  // );

  // Step 2 - Generate Transaction Message
  let messageV0;
  if (addressLookupTable && addressLookupTable.length !== 0) {
    const result = []
      for (const address of addressLookupTable) {
        const lookupTableAccount = (
          await connection.getAddressLookupTable(address)
        ).value;
        if(lookupTableAccount){
          result.push(lookupTableAccount)
        }
      }
   
    messageV0 = new TransactionMessage({
      payerKey: publicKey,
      recentBlockhash: latestBlockhash.blockhash,
      instructions: txInstructions,
    }).compileToV0Message(result);
    // console.log(messageV0)
  } else {
    messageV0 = new TransactionMessage({
      payerKey: publicKey,
      recentBlockhash: latestBlockhash.blockhash,
      instructions: txInstructions,
    }).compileToV0Message();
  }

  // console.log("   ✅ - Compiled Transaction Message");
  const transaction = new VersionedTransaction(messageV0);


  // Step 3 - Sign your transaction with the required `Signers`
  const blockHash = await connection.getLatestBlockhash()
  // transaction.feePayer = publicKey
  // transaction.recentBlockhash = blockHash.blockhash
  const signed = await signTransaction(transaction)

  const signature = await connection.sendRawTransaction(signed.serialize()).catch(err => {
      console.error(err.logs)
      throw new Error(err)
    });

  await connection.confirmTransaction({
    blockhash: blockHash.blockhash,
    lastValidBlockHeight: blockHash.lastValidBlockHeight,
    signature,
  })
  // const txid = await provider.connection.sendTransaction(transaction, {
  //   maxRetries: 5,
  // }).catch(err => {
  //   console.error(err)
  //   if (err.logs) {
  //     err.logs.forEach(element => {
  //       console.error(element)
  //     });
  //   }
  //   throw new Error(err)
  // });
  // console.log("   ✅ - Transaction sent to network");

  // // Step 5 - Confirm Transaction
  // const confirmation = await provider.connection.confirmTransaction({
  //   signature: txid,
  //   blockhash: latestBlockhash.blockhash,
  //   lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
  // });
  // // provider.connection.lo
  // if (confirmation.value.err) {
  //   throw new Error(
  //     `   ❌ - Transaction not confirmed.\nReason: ${confirmation.value.err}`
  //   );
  // }

  // console.log("🎉 Transaction Successfully Confirmed!");

}
  return {createAndSendV0Tx};
}