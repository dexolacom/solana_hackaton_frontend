import { useWallet } from '@solana/wallet-adapter-react';
import { ParsedAccountData } from '@solana/web3.js';
import { fetchDigitalAssetWithTokenByMint } from '@metaplex-foundation/mpl-token-metadata'
import { publicKey as createPubKey } from '@metaplex-foundation/umi';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { connection } from '../constant';
import { useEffect, useState } from 'react';
import { addressNftCollection } from '../constant';
import { umi } from '../constant';


export const useGetNfts = () => {
  const [tokens, setTokens] = useState<any[]>([]);
  const { publicKey } = useWallet();


  useEffect(() => {
    if (!publicKey) return;

    const fetchData = async () => {

      try {
        const walletTokens = await getTheTokensOfOwner();
        if (walletTokens) {
          setTokens(walletTokens);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [publicKey])

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

        try {
          const objT: any = {};
          objT.mint = mintS;
          objT.amount = amountI
          tokensInWallet.push(objT)
        } catch (error) {
          console.error(error);
        }
      }
    });

    const nftsData = await fetchAllMetadata(tokensInWallet) || [];

    const filteredNfts = nftsData.filter(nft => nft.metadata.collection.value.key === addressNftCollection);

    return filteredNfts;

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

  return { tokens }
};