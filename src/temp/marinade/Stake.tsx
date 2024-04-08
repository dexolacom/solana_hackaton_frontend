// import { useState } from 'react'
// import { MarinadeUtils, Marinade, MarinadeConfig } from '@marinade.finance/marinade-ts-sdk'
// import { useConnection, useWallet } from '@solana/wallet-adapter-react'
// import { WalletError } from '@solana/wallet-adapter-base'
// import { useAppContext } from '@/providers/AppProvider/AppProvider'

// export const Stake = () => {
//   const { getBalance } = useAppContext()
//   const [amount, setAmount] = useState(0)
//   const [processingTransaction, setProcessingTransaction] = useState(false)

//   const { connection } = useConnection()
//   const { sendTransaction, publicKey } = useWallet()

//   const config = new MarinadeConfig({ connection, publicKey })
//   const marinade = new Marinade(config)

//   const onTransaction = (tx: string) => alert(tx)
//   const onError = (error: Error) => alert(error)

//   if (processingTransaction) {
//     return <div>Loading...</div>
//   }

//   const handleClickStake = async () => {
//     try {
//       if (!marinade) {
//         return console.error('Not provider')
//       }
//       setProcessingTransaction(true)

//       const { transaction } = await marinade.deposit(MarinadeUtils.solToLamports(amount))
//       const transactionSignature = await sendTransaction(transaction, connection)
//       onTransaction?.(transactionSignature)
//       await getBalance()
//     } catch (err) {
//       if (err instanceof Error && !(err instanceof WalletError)) {
//         onError?.(err)
//       }
//     } finally {
//       setProcessingTransaction(false)
//     }
//   }

//   const handleClickUnStake = async () => {
//     try {
//       setProcessingTransaction(true)
//       const { transaction } = await marinade.liquidUnstake(MarinadeUtils.solToLamports(amount))
//       const transactionSignature = await sendTransaction(transaction, connection)
//       onTransaction?.(transactionSignature)
//     } catch (err) {
//       if (err instanceof Error && !(err instanceof WalletError)) {
//         onError?.(err)
//       }
//     } finally {
//       setProcessingTransaction(false)
//     }
//   }

//   return (
//     <div style={{ display: 'flex', gap: '20px', width: '500px' }}>
//       <div>
//         <input
//           style={{ padding: '4px' }}
//           onChange={(e) => setAmount(Number(e.target.value) || 0)}
//           placeholder='SOL amount to stake'
//         />
//       </div>
//       <button
//         style={{ backgroundColor: 'aqua', border: '1px solid black', padding: '4px' }}
//         onClick={() => handleClickStake()}
//       >
//         Stake SOL
//       </button>
//       <button
//         style={{ backgroundColor: 'aqua', border: '1px solid black', padding: '4px' }}
//         onClick={() => handleClickUnStake()}
//       >
//         UnStake SOL
//       </button>
//     </div>
//   )
// }
