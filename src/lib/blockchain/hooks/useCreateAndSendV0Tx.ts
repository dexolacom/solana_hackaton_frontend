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
  
  const latestBlockhash = await connection.getLatestBlockhash(
    "confirmed"
  );

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

  } else {
    messageV0 = new TransactionMessage({
      payerKey: publicKey,
      recentBlockhash: latestBlockhash.blockhash,
      instructions: txInstructions,
    }).compileToV0Message();
  }

  const transaction = new VersionedTransaction(messageV0);

  const blockHash = await connection.getLatestBlockhash()
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
}
  return {createAndSendV0Tx};
}