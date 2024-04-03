import { useWallet } from '@solana/wallet-adapter-react';
import { ParsedAccountData } from '@solana/web3.js';
import { fetchDigitalAssetWithTokenByMint } from '@metaplex-foundation/mpl-token-metadata'
import { publicKey as createPubKey } from '@metaplex-foundation/umi';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { connection } from '../constant';
import { useQuery } from '@tanstack/react-query';
import { addressNftCollection } from '../constant';
import { umi } from '../constant';

export const useGetNfts = () => {

  const { publicKey } = useWallet();

  const getTheTokensOfOwner = async () => {
    if (!publicKey) return;
    const tokensInWallet: any = [];
    const accounts = await connection.getParsedProgramAccounts(
      TOKEN_PROGRAM_ID,
      {
        filters: [
          {
            dataSize: 165,
          },
          {
            memcmp: {
              offset: 32,
              bytes: publicKey.toBase58(),
            },
          },
        ],
      }
    );

    accounts.forEach((account) => {
      const parsedData = account.account.data as ParsedAccountData;
      const amountI = parsedData["parsed"]["info"]["tokenAmount"]["uiAmount"];
      const mintS = parsedData["parsed"]["info"]["mint"]

      if (amountI === 1) {
        const objT: any = {};
        objT.mint = mintS;
        objT.amount = amountI
        tokensInWallet.push(objT)
      }
    });
    return tokensInWallet;
  }

  const fetchMetadata = async (mintAddress: string) => {
    const mintPubkey = createPubKey(mintAddress);
    const asset = await fetchDigitalAssetWithTokenByMint(umi, mintPubkey)
    return asset;
  };

  const fetchAllMetadata = async (tokens: any) => {
    const promises = tokens.map((token: any) => fetchMetadata(token.mint));
    return Promise.all(promises);
  };

  const fetchNfts = async () => {
    const walletTokens = await getTheTokensOfOwner();
    const nftsData = await fetchAllMetadata(walletTokens) || [];
    const filteredNfts = nftsData.filter(nft => nft.metadata.collection.value.key === addressNftCollection);
    console.log("🚀 ~ fetchNfts ~ filteredNfts:", filteredNfts)
    return filteredNfts;
  };

  const { data: tokens = [], isLoading, isError } = useQuery({
    queryKey: ['getNfts'],
    queryFn: () => fetchNfts(),
    staleTime: 60000,
    enabled: !!publicKey
  })

  return { tokens, isLoading, isError }
};