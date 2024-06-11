import { useWallet } from "@solana/wallet-adapter-react";
// import { ParsedAccountData } from "@solana/web3.js";
// import { fetchDigitalAssetWithTokenByMint } from "@metaplex-foundation/mpl-token-metadata";
// import { publicKey as createPubKey } from "@metaplex-foundation/umi";
// import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { connectionDevNet } from "../constant";
import { useQuery } from "@tanstack/react-query";
import {
  addressClassicCollection,
  addressEcosystemCollection,
} from "../constant";
import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';
import { NftMetadataType } from "@/lib/types";
// import { umi } from "../constant";
// import { useCallback } from "react";

export const useGetNfts = () => {
  const { publicKey, wallet } = useWallet();

    const fetchNfts = async () => {
    if (!publicKey || !wallet) return [];

    const metaplex = Metaplex.make(connectionDevNet).use(
      walletAdapterIdentity(wallet.adapter)
    );

    const nfts = await metaplex.nfts().findAllByOwner({ owner: publicKey });

    const filteredNfts = nfts.filter((nft) => {
      if (!nft.collection) return false;
      return (
        nft?.collection?.address?.toString() === addressClassicCollection ||
        nft?.collection?.address?.toString() === addressEcosystemCollection
      );
    });

    return filteredNfts as NftMetadataType[];
  };

  // const getTheTokensOfOwner = useCallback(async () => {
  //   if (!publicKey) return;
  //   const tokensInWallet: any = [];
  //   const accounts = await connectionDevNet.getParsedProgramAccounts(
  //     TOKEN_PROGRAM_ID,
  //     {
  //       filters: [
  //         {
  //           dataSize: 165,
  //         },
  //         {
  //           memcmp: {
  //             offset: 32,
  //             bytes: publicKey.toBase58(),
  //           },
  //         },
  //       ],
  //     }
  //   );

  //   accounts.forEach((account) => {
  //     const parsedData = account.account.data as ParsedAccountData;
  //     const amountI = parsedData["parsed"]["info"]["tokenAmount"]["uiAmount"];
  //     const mintS = parsedData["parsed"]["info"]["mint"];

  //     if (amountI === 1) {
  //       const objT: any = {};
  //       objT.mint = mintS;
  //       objT.amount = amountI;
  //       tokensInWallet.push(objT);
  //     }
  //   });
  //   return tokensInWallet;
  // },[]);

  // const fetchMetadata = useCallback(async (mintAddress: string) => {
  //   const mintPubkey = createPubKey(mintAddress);
  //   const asset = await fetchDigitalAssetWithTokenByMint(umi, mintPubkey);
  //   return asset;
  // },[]);

  // const fetchAllMetadata = useCallback(async (tokens: any) => {
  //   const promises = tokens.map((token: any) => fetchMetadata(token.mint));
  //   return Promise.all(promises);
  // },[]);

  // const fetchNfts = useCallback(async () => {
  //   const walletTokens = await getTheTokensOfOwner();
  //   const nftsData = (await fetchAllMetadata(walletTokens)) || [];
  //   const filteredNfts = nftsData.filter(
  //     (nft) =>
  //       nft.metadata.collection.value.key === addressClassicCollection ||
  //       nft.metadata.collection.value.key === addressEcosystemCollection
  //   );
  //   return filteredNfts;
  // },[]);

  const {
    data: tokens = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getNfts", publicKey],
    queryFn: () => fetchNfts(),
    staleTime: Infinity,
    enabled: !!publicKey,
  });

  return { tokens, isLoading, isError };
};
