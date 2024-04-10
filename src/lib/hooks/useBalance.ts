import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState, useCallback } from 'react'
import { connection } from '../blockchain/constant'

export const useBalance = () => {
  const [balance, setBalance] = useState(0)
  const { publicKey } = useWallet()

  const getBalance = useCallback(async () => {
    if (publicKey) {
      const fetchedBalance = await connection.getBalance(publicKey)
      setBalance(fetchedBalance)
    }
  }, [publicKey])

  useEffect(() => {
    getBalance()
  }, [getBalance])

  return { balance, getBalance }
}
