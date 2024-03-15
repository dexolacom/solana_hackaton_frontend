import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { PublicKey } from '@solana/web3.js'

export const Balance = () => {
  const [balance, setBalance] = useState(0)
  const { publicKey } = useWallet()
  const { connection } = useConnection()

  const getBalance = async () => {
    return await connection.getBalance(publicKey as PublicKey)
  }

  useEffect(() => {
    if (publicKey) {
      getBalance().then((res) => setBalance(res))
    }
  }, [publicKey, connection])

  return <span>Your Solana Balance: {balance} SOL</span>
}
