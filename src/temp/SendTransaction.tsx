import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js'

export function SendTransaction() {
  const { connection } = useConnection()
  const { sendTransaction, publicKey } = useWallet()

  const sendSolana = async () => {
    const toPublicKey = new PublicKey('3XBJcNsP9qikSryCpgiiYGVYAhvi1HggNYyDCesqDmNL')
    const transaction = new Transaction()

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: publicKey as PublicKey,
        toPubkey: toPublicKey,
        lamports: LAMPORTS_PER_SOL * 0.1,
      })
    )

    await sendTransaction(transaction, connection)
  }

  return (
    <div>
      <button disabled={!publicKey} onClick={sendSolana}>
        Send transaction
      </button>
    </div>
  )
}
