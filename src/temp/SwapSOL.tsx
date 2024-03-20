import { PublicKey, Transaction, TransactionInstruction, SystemProgram } from "@solana/web3.js";
//@ts-ignore
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync  } from "@solana/spl-token";

import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import {
  connection,
} from "./constant/constant";


const SwapSOL = () => {
  const wallet = useAnchorWallet();
  const { sendTransaction } = useWallet();

  const handleChange = async () => {

    if (!wallet) {
      console.error("Wallet is undefined");
      return;
    }

    // tokens to swap

    // const token_defs = {
    //   "BRjpCHtyQLNCo8gqRUr8jtdAj5AjPYQaoqbvcZiHok1k": {name: "devUSDC", decimals: 6},
    //   "H8UekPGwePSmQ3ttuYGPU1szyFfjZR4N53rymSFwpLPm": {name: "devUSDT", decimals: 6},
    //   "Jd4M8bfJG3sAkd82RsGWyEXoaBXQP7njFzBwEaCTuDa":  {name: "devSAMO", decimals: 9},
    //   "Afn8YB1p4NsoZeS5XJBZ18LTfEy5NFPwN46wapZcBQr6": {name: "devTMAC", decimals: 6},
    // };

    const devTokenName = "devUSDT";
    const devTokenMint = new PublicKey('H8UekPGwePSmQ3ttuYGPU1szyFfjZR4N53rymSFwpLPm');

    const DEVTOKEN_DISTRIBUTOR_PROGRAM_ID = new PublicKey("Bu2AaWnVoveQT47wP4obpmmZUwK9bN9ah4w6Vaoa93Y9");
    const DEVTOKEN_ADMIN = new PublicKey("3otH3AHWqkqgSVfKFkrxyDqd2vK6LcaqigHrFEmWcGuo");
    const PDA = new PublicKey("3pgfe1L6jcq59uy3LZmmeSCk9mwVvHXjn21nSvNr8D6x");

    const user = wallet.publicKey;
    const vault = getAssociatedTokenAddressSync(devTokenMint, PDA, true);
    const user_vault = getAssociatedTokenAddressSync(devTokenMint, user);
    const ix = new TransactionInstruction({
      programId: DEVTOKEN_DISTRIBUTOR_PROGRAM_ID,
      keys: [
        { pubkey: devTokenMint, isSigner: false, isWritable: false },
        { pubkey: vault, isSigner: false, isWritable: true },
        { pubkey: PDA, isSigner: false, isWritable: false },
        { pubkey: user, isSigner: true, isWritable: true },
        { pubkey: user_vault, isSigner: false, isWritable: true },
        { pubkey: DEVTOKEN_ADMIN, isSigner: false, isWritable: true },
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        { pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      ],
      data: Buffer.from([0xBF, 0x2C, 0xDF, 0xCF, 0xA4, 0xEC, 0x7E, 0x3D]), // instruction code for distribute
    });

    const tx = new Transaction();
    tx.add(ix);

    const signature = await sendTransaction(tx, connection)

    const latest_blockhash = await connection.getLatestBlockhash();
    await connection.confirmTransaction({ signature, ...latest_blockhash });

    const dev_token_balance = await connection.getTokenAccountBalance(user_vault);

    console.log(`${devTokenName}:`, dev_token_balance.value.uiAmount);

  }
  return (

    <>
      <button style={{ border: '1px', backgroundColor: 'aqua' }} onClick={() => handleChange()}>Change</button>
    </>
  )
}

export default SwapSOL;