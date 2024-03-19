import { useEffect, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { NativeStakingConfig, NativeStakingSDK } from '@marinade.finance/native-staking-sdk'
import { VersionedTransaction, TransactionMessage } from '@solana/web3.js';
import { BN } from '@project-serum/anchor'

const NativeStaking = () => {
  const { connection } = useConnection()
  const { sendTransaction, signTransaction, publicKey } = useWallet()

  const [amount, setAmount] = useState(0)
  const [rewards, setRewards] = useState(0)

  useEffect(() => {
    if (publicKey) {
      const fetchRewards = async () => {
        console.log("🚀 ~ fetchRewards ~ publicKey:", publicKey)
        const currentRewards = await sdk.fetchRewards(publicKey)
        const accounts = await sdk.getStakeAccounts(publicKey)
        console.log("🚀 ~ fetchRewards ~ accounts:", accounts)

        console.log("🚀 ~ fetchRewards ~ currentRewards:", currentRewards)
        // setRewards(currentRewards);
      }
      fetchRewards();
    }

  }, [publicKey])


  const config = new NativeStakingConfig({ connection })
  const sdk = new NativeStakingSDK(config)

  if (!publicKey) {
    return <></>
  }

  const handleUnStaked = async () => {
    const converAmount = (+amount * 1000000000).toString();
    const { payFees, onPaid } = await sdk.initPrepareForRevoke(publicKey, new BN(converAmount)) // pass `null` instead of `amount` to prepare everything for unstake

    // sdk.config.prepareForRevokeCost - fee in lamports

    const { blockhash } = await connection.getLatestBlockhash()
    const tx = new VersionedTransaction(new TransactionMessage({
      payerKey: publicKey,
      recentBlockhash: blockhash,
      instructions: payFees,
    }).compileToV0Message())
    if (signTransaction && sendTransaction) {
      await signTransaction(tx) // add signature of the user
      const signature = await sendTransaction(tx, connection)

      await connection.confirmTransaction(signature, 'finalized')
      await onPaid(signature)
    }
  }


  const handleClickStake = async () => {
    const converAmount = (+amount * 1000000000).toString();
    const { createAuthorizedStake, stakeKeypair } = sdk.buildCreateAuthorizedStakeInstructions(publicKey, new BN(converAmount))

    const { blockhash } = await connection.getLatestBlockhash()
    const tx = new VersionedTransaction(new TransactionMessage({
      payerKey: publicKey,
      recentBlockhash: blockhash,
      instructions: createAuthorizedStake,
    }).compileToV0Message())


    if (signTransaction && sendTransaction) {
      tx.sign([stakeKeypair]);
      await signTransaction(tx);
      await sendTransaction(tx, connection);
    }
  }

  return (<div style={{ display: 'flex', gap: '20px', width: '500px' }}>
    <div>
      <input style={{ padding: '4px' }}
        onChange={(e) => setAmount(Number(e.target.value) || 0)}
        placeholder='SOL amount to stake'
      />
    </div>
    <button style={{ backgroundColor: 'aqua', border: '1px solid black', padding: '4px' }}
      onClick={() => handleClickStake()}>
      Stake SOL
    </button>
    <button style={{ backgroundColor: 'aqua', border: '1px solid black', padding: '4px' }}
      onClick={() => handleUnStaked()}
    >
      unStake
    </button>
  </div>)


}

export default NativeStaking;