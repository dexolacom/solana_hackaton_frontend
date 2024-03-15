import {
  // useConnection,
  useWallet
} from '@solana/wallet-adapter-react';
// import { PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js';
import { clusterApiUrl, Transaction, SystemProgram, LAMPORTS_PER_SOL, PublicKey, Connection } from '@solana/web3.js';

export function SendTransaction() {
  // const { connection } = useConnection();
  const connection = new Connection(clusterApiUrl("devnet"));
  const { sendTransaction, publicKey } = useWallet();

  const sendSolana = async () => {
    const toPublicKey = new PublicKey('2mxosq2T98t7dvigPcZENkjNK93JfZhU9MZzMAfD5XWN');
    const transaction = new Transaction();

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: publicKey as PublicKey,
        toPubkey: toPublicKey,
        lamports: LAMPORTS_PER_SOL * 0.1,
      })
    );

    await sendTransaction(transaction, connection);
  };

  return (
    <div>
      <button disabled={!publicKey} onClick={sendSolana}>
        Send transaction
      </button>
    </div>
  );
}