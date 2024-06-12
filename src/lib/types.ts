import { BN } from '@project-serum/anchor';

interface BaseData {
  id: string;
  created_at: string;
  updated_at: string;
}
interface InfoCoin {
  name: string;
  symbol: string;
  riskType: 'Low' | 'Medium' | 'High';
}

export interface ProjectType extends BaseData {
  name: string;
}

export interface ResponseProjectTypeItem {
  name: string;
  tokens: ProjectTypeItem[];
}
export interface ProjectTypeItem extends InfoCoin {
  coinPrice: number;
  change24h: number;
  marketCap: number;
}

export interface TokenType extends InfoCoin, BaseData {
  coinmarketcapId: number;
}

export interface NftMetadataType {
  model: string;
  address: BN;
  mintAddress: BN;
  updateAuthorityAddress: BN;
  json: null;
  jsonLoaded: boolean;
  name: string;
  symbol: string;
  uri: string;
  isMutable: boolean;
  primarySaleHappened: boolean;
  sellerFeeBasisPoints: number;
  editionNonce: number;
  creators: any[];
  tokenStandard: number;
  collection: {
    verified: boolean;
    key: BN;
    address: BN;
  };
  collectionDetails: any;
  uses: any;
  programmableConfig: any;
}
