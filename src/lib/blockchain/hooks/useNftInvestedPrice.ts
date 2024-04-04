import { CollectionType, useSolanaRate } from '@/lib/api/hooks/useSolanaRate';
import { decimalsToken, usdcAddress } from '@/lib/blockchain/constant';
import { currencyFormatter } from '@/lib/utils';
import {
  useWallet,
} from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { connection } from '../constant';

interface UseNftInvestedPriceArgs {
  mint: PublicKey,
  collection: CollectionType
}

export const useNftInvestedPrice = ({ mint, collection }: UseNftInvestedPriceArgs) => {
  const { publicKey } = useWallet();
  const { solanaRate } = useSolanaRate(collection);

  // const mint = new PublicKey('CRbBDDcHAFAYNhPrNoPrp7vrxbB7S9qLoGb6yzocgrDz'); //SOL
  // const mint = new PublicKey('75bTjt7gdbe2bEbxRes623UXzJAeWBqULVwTah9rsNzb'); //USDC

  const getTransaction = async () => {
    const signatures = await connection.getSignaturesForAddress(mint)
    const signaturesLength = signatures.length;
    const firstSignarure = signatures[signaturesLength - 1].signature;
    // console.log("🚀 ~ getTransaction ~ firstSignarure:", firstSignarure)

    const parsedTransaction = await connection.getParsedTransaction(firstSignarure);
    const tokenAddress = parsedTransaction?.meta?.preTokenBalances?.[0].mint;
    const isUsdcToken = tokenAddress === usdcAddress;
    //@ts-ignore
    const amount = parsedTransaction?.meta?.innerInstructions?.[0].instructions.find(item => item.parsed.type === 'transfer').parsed.info.amount;
    const convertAmount = isUsdcToken ? amount / decimalsToken['USDC'] : amount / decimalsToken['SOL'];
    // console.log("🚀 ~ getTransaction ~ convertAmount:", convertAmount)

    const date = new Date(parsedTransaction!.blockTime! * 1000);
    const formattedDate = date.toLocaleString();
    // console.log("🚀 ~ getTransaction ~ formattedDate:", formattedDate);
    const investedPrice = isUsdcToken ? currencyFormatter(convertAmount) : currencyFormatter((solanaRate ?? 0) * convertAmount);
    console.log("🚀 ~ getTransaction ~ investedPrice:", investedPrice)
    // console.log("🚀 ~ getTransaction ~ investedPrice:", investedPrice)

    return { investedPrice, formattedDate };
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: [mint.toBase58()],
    queryFn: () => getTransaction(),
    enabled: !!publicKey
  })

  return { investedPrice: data?.investedPrice, formattedDate: data?.formattedDate, isLoading, isError  };
}