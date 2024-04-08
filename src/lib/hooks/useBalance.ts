import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState, useCallback } from 'react'

export const useBalance = () => {
  const [balance, setBalance] = useState(0)
  const { publicKey } = useWallet()
  const { connection } = useConnection()

  const getBalance = useCallback(async () => {
    if (publicKey) {
      const fetchedBalance = await connection.getBalance(publicKey)
      setBalance(fetchedBalance)
    }
  }, [connection, publicKey])

  useEffect(() => {
    getBalance()
  }, [getBalance])

  return { balance, getBalance }
}
