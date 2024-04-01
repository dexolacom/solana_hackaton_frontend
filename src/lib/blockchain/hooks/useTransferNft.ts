import { Keypair, Transaction, Connection, PublicKey } from "@solana/web3.js";
import { createTransferCheckedInstruction, getAssociatedTokenAddress } from "@solana/spl-token";
import { connection } from "../constant";

interface TransferNftProps {
  destinationAddress: PublicKey;
  owner: PublicKey;
  mintPubkey: PublicKey;
}

export const useTransferNft = ({ destinationAddress, owner, mintPubkey }: TransferNftProps) => {
  const transferNft = async () => {
      const nftATA = await getAssociatedTokenAddress(
            mintPubkey,
            owner 
          );

      // const tokenAccount2Pubkey = new PublicKey(ata);
const transaction = new Transaction();
  transaction.add(
    createTransferCheckedInstruction(
      owner, // from
      mintPubkey, // mint
      destinationAddress, // to
      owner, // from's owner
      1, // amount
      0 // decimals
    )
  );
  }
}


// import * as bs58 from "bs58";

// async function transfer() {
//   // connection to Solana. 
// const connection = new Connection("https://rpc.helius.xyz/?api-key=");

// // Payer of new ATA. 
// const feePayer = Keypair.fromSecretKey(
//   bs58.decode("privateKey")
// );

// // Previous owner of Token or NFT
// const prevOwner = Keypair.fromSecretKey(
//   bs58.decode("privateKey")
// );
// // Mint address of the NFT. 
// const mintPubkey = new PublicKey("4umMdShNxbdnoV2EZjUp6h5GYYneZFLH9otBEU2K3ZYP");
// // Recipient of the NFT. 
// const receiveAdress = new PublicKey('2xSHLfiPs3aEhzbLnYbyzWYMEaYnwSwJwAnVh5CwHWwX')
// // Original Token Account
// const tokenAccount1Pubkey = new PublicKey("CE2uTSeVbBhy2Q8qVEnp8qAJYBQkVxMC4uGzchiAn6gG");
// let ata = await getAssociatedTokenAddress(
//     mintPubkey, // mint
//     receiveAdress // owner
//   );
// // Create transfer instruction to from the previous ATA owned by old wallet, to new ATA. 
// const tokenAccount2Pubkey = new PublicKey(ata);
// let tx = new Transaction();
//   tx.add(
//     createTransferCheckedInstruction(
//       tokenAccount1Pubkey, // from
//       mintPubkey, // mint
//       tokenAccount2Pubkey, // to
//       prevOwner.publicKey, // from's owner
//       1, // amount
//       0 // decimals
//     )
//   );
//   // Send Transaction here. 
//   console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, prevOwner])}`);
// }

transfer()