// import { PublicKey, ComputeBudgetProgram } from '@solana/web3.js'
// import { AnchorProvider } from '@coral-xyz/anchor'
// import { useAnchorWallet } from '@solana/wallet-adapter-react'
// import { DecimalUtil, Percentage } from '@orca-so/common-sdk'
// import { connection, commitmentLevel } from './constant/constant'
// import {
//   WhirlpoolContext,
//   buildWhirlpoolClient,
//   ORCA_WHIRLPOOL_PROGRAM_ID,
//   PDAUtil,
//   swapQuoteByInputToken,
//   IGNORE_CACHE,
// } from '@orca-so/whirlpools-sdk'
// import Decimal from 'decimal.js'

// const SwapUSDCtoUSDT = () => {
//   const wallet = useAnchorWallet()

//   const handleChange = async () => {
//     if (!wallet) {
//       console.error('Wallet is undefined')
//       return
//     }

//     const provider = new AnchorProvider(connection, wallet, {
//       preflightCommitment: commitmentLevel,
//     })

//     const ctx = WhirlpoolContext.withProvider(provider, ORCA_WHIRLPOOL_PROGRAM_ID)
//     const client = buildWhirlpoolClient(ctx)

//     const devUSDC = { mint: new PublicKey('BRjpCHtyQLNCo8gqRUr8jtdAj5AjPYQaoqbvcZiHok1k'), decimals: 6 }
//     const devUSDT = { mint: new PublicKey('H8UekPGwePSmQ3ttuYGPU1szyFfjZR4N53rymSFwpLPm'), decimals: 6 }

//     const DEVNET_WHIRLPOOLS_CONFIG = new PublicKey('FcrweFY1G9HJAHG5inkGB6pKg1HZ6x9UC2WioAfWrGkR')

//     // Get devUSDT/devUSDC whirlpool

//     const tick_spacing = 1
//     const whirlpool_pubkey = PDAUtil.getWhirlpool(
//       ORCA_WHIRLPOOL_PROGRAM_ID,
//       DEVNET_WHIRLPOOLS_CONFIG,
//       devUSDC.mint,
//       devUSDT.mint,
//       tick_spacing
//     ).publicKey
//     console.log('whirlpool_key:', whirlpool_pubkey.toBase58())
//     const whirlpool = await client.getPool(whirlpool_pubkey)

//     const amount_in = new Decimal('1')

//     const quote = await swapQuoteByInputToken(
//       whirlpool,
//       // Input token and amount
//       devUSDT.mint,
//       DecimalUtil.toBN(amount_in, devUSDT.decimals),
//       // Acceptable slippage (10/1000 = 1%)
//       Percentage.fromFraction(10, 1000),
//       ctx.program.programId,
//       ctx.fetcher,
//       IGNORE_CACHE
//     )

//     console.log(
//       'estimatedAmountIn:',
//       DecimalUtil.fromBN(quote.estimatedAmountIn, devUSDT.decimals).toString(),
//       'devUSDT'
//     )
//     console.log(
//       'estimatedAmountOut:',
//       DecimalUtil.fromBN(quote.estimatedAmountOut, devUSDC.decimals).toString(),
//       'devUSDC'
//     )
//     console.log(
//       'otherAmountThreshold:',
//       DecimalUtil.fromBN(quote.otherAmountThreshold, devUSDC.decimals).toString(),
//       'devUSDC'
//     )

//     // Create instructions to add priority fee
//     const estimated_compute_units = 300_000
//     const additional_fee_in_lamports = 10_000

//     const set_compute_unit_price_ix = ComputeBudgetProgram.setComputeUnitPrice({
//       // Specify how many micro lamports to pay in addition for 1 CU
//       microLamports: Math.floor((additional_fee_in_lamports * 1_000_000) / estimated_compute_units),
//     })
//     const set_compute_unit_limit_ix = ComputeBudgetProgram.setComputeUnitLimit({
//       // To determine the Solana network fee at the start of the transaction, explicitly specify CU
//       // If not specified, it will be calculated automatically. But it is almost always specified
//       // because even if it is estimated to be large, it will not be refunded
//       units: estimated_compute_units,
//     })

//     const tx = await whirlpool.swap(quote)
//     tx.prependInstruction({
//       instructions: [set_compute_unit_limit_ix, set_compute_unit_price_ix],
//       cleanupInstructions: [],
//       signers: [],
//     })

//     const signature = await tx.buildAndExecute()
//     console.log('signature:', signature)

//     const latest_blockhash = await ctx?.connection.getLatestBlockhash()
//     await ctx?.connection.confirmTransaction({ signature, ...latest_blockhash }, 'confirmed')
//   }
//   return (
//     <>
//       <button style={{ border: '1px', backgroundColor: 'aqua' }} onClick={() => handleChange()}>
//         Change
//       </button>
//     </>
//   )
// }

// export default SwapUSDCtoUSDT
