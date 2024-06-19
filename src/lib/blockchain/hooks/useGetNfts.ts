import { useWallet } from '@solana/wallet-adapter-react';
// import { ParsedAccountData } from "@solana/web3.js";
// import { fetchDigitalAssetWithTokenByMint } from "@metaplex-foundation/mpl-token-metadata";
// import { publicKey as createPubKey } from "@metaplex-foundation/umi";
// import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { connectionDevNet } from '../constant';
import { useQuery } from '@tanstack/react-query';
import { addressClassicCollection, addressEcosystemCollection } from '../constant';
import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';
import { NftMetadataType } from '@/lib/types';
// import { umi } from "../constant";
// import { useCallback } from "react";

export const useGetNfts = () => {
  const { publicKey, wallet } = useWallet();

  const fetchNfts = async () => {
    if (!publicKey || !wallet) return [];

    const metaplex = Metaplex.make(connectionDevNet).use(walletAdapterIdentity(wallet.adapter));

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

  const {
    data: tokens = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['getNfts', publicKey],
    queryFn: () => fetchNfts(),
    staleTime: Infinity,
    enabled: !!publicKey
  });

  return { tokens, isLoading, isError };
};
