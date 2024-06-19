import idl from '@/lib/blockchain/programData/idl.json';
import { clusterApiUrl, PublicKey, Connection } from '@solana/web3.js';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';

export const commitmentLevel = 'confirmed';
export const endpoint = `https://solana-devnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`;

export const endpointDevNet = clusterApiUrl('devnet');
export const connection = new Connection(endpoint, commitmentLevel);
export const connectionDevNet = new Connection(endpointDevNet, commitmentLevel);

export const umi = createUmi(endpoint).use(mplTokenMetadata());

export const programId = new PublicKey('AguvXyhZXA9WMXfezVHCnz9rjGDPRrDY6FdMcmgSaaKN');

export const classicProgramInterface = JSON.parse(JSON.stringify(idl));

export const addressClassicCollection = 'AseMf5WSUqKkP1SFXTDnBNUcHmJunRdj5ix1mUsNoP9V'; //-?
export const addressEcosystemCollection = 'B2v4NRfTRC546VWmAUzvwjmoufnDv8bmdrcm86dZRn7K'; //-?

export const TOKEN_METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

export const portfolioLookupTable = new PublicKey('7SXMzMSkHZ95BFb62F18b6rP3WWG16VMQmqkUjDXmWwD');
export const treasury = new PublicKey('8QdnKN4JbhpSLdhJVcCswmSy3X1Z3hmyZEG3VvGGNHn7');

export const coins = [
  {
    currency: 'USDC',
    mint: 'HxwDiYR6swJjW3hhAt4CCmq2qPxXGn29BCjaciXR6S3J',
    decimals: 1e6
  },
  {
    currency: 'SOL',
    mint: 'So11111111111111111111111111111111111111112',
    decimals: 1e9
  },
  {
    currency: 'BTC',
    decimals: 1e8,
    mint: 'FibETkfHcCF7Brxn1TryCtD6Z6KAjQgF1VtjfRRS4KQy'
  },
  {
    decimals: 1e8,
    currency: 'ETH',
    mint: 'NftTPJXniF2Pqfw15HWfn1NfoNa36LgnWi7DCoWmKzC'
  },
  {
    decimals: 1e6,
    currency: 'JUP',
    mint: 'BaRCAG2Jw7pyNbDMgaj2vrZGhRrXWpFzSZgoPQ1CyFkL'
  },
  {
    decimals: 1e8,
    currency: 'RNDR',
    mint: 'JCdkWwFwLj1g9XGFmEqUT5sUroy71auNtwQCLUZNAmBN'
  },
  {
    decimals: 1e8,
    currency: 'HNT',
    mint: '7a8BuU2PTLMCfoCLZkWsmgKZUxk9NTDTsH99QdJnAHRE'
  },
  {
    decimals: 1e5,
    currency: 'BONK',
    mint: 'EuMqSBjc6m34CBGyeHGi9aV81iC8uRTgMb1V273cWdeq'
  },
  {
    decimals: 1e6,
    currency: 'PYTH',
    mint: '9F7rpeDN3aakcAhNMdH43EST4desvLBWdme3s3ZSyGr6'
  },
  {
    decimals: 1e6,
    currency: 'RAY',
    mint: '3krnbdBdvzrZDR34BBwUA4ttxNJ5Jf9EGuFZViuJZZw2'
  },
  {
    decimals: 1e9,
    currency: 'JTO',
    mint: '2BjvT8iM9AQJsHXWDy2nuvzEu8yjCP4rL98VS89YTibw'
  },
  {
    decimals: 1e6,
    currency: 'WIF',
    mint: '75hBcTeGiJ6xQRfVF3xvfX9eWhqsuK9B5kpEXjBWjehE'
  }
];

export const WHIRLPOOLS = {
  ['BhKhpfHuHvcLtteqDidKrzAtCbjDMSu6P2PDF7vFCsSe']: {
    // USDC
    '4AJv9M5uMrMbyArp9Tio9MR2WovY9r5F8MXdQLRyDHaC': {
      key: new PublicKey('Axjcsj6x8USndCEfXXQTRsJqJeuQGgipENGgEVmHtrPD'),
      invert: true
    }, // 8 dec ETH
    '7u8NENSnY1k6vH6HERBvJvCjqkpwFHGTnxzmwEAvbMng': {
      key: new PublicKey('BUuunRGciN47Vg83mfbY7KVCbY2CJKMiUVqNTRfzL6sK'),
      invert: true
    }, // 8 dec BTC
    So11111111111111111111111111111111111111112: {
      key: new PublicKey('HbeqPBsAn57EUs9BJar8KorKG7VreBZrKM4QnhYEuFM9'),
      invert: true
    }, // 9 dec SOL
    B9L1ksf9U7fyWJcb6oEUs9NQjar3gYWPTrG23phHdHcm: {
      key: new PublicKey('9VLZPnjeT2dtDYRFeA3SuypRAXxyrgzfqV32Fk1HXR8a'),
      invert: true
    }, // 6 dec JUP
    '7nXViVzM7ehQZ5y5Jg6nBjPkpfcXPUyi2JEo6NiwzgHx': {
      key: new PublicKey('94U4aoAsXHqKGt2D4Subhf78sHWfQoqBWRtKZmnFWYJA'),
      invert: true
    }, // 8 dec RNDR
    Au69YNzR39wDY2MEVFUFakmiEYzmpS7bjJyJdkiatRwJ: {
      key: new PublicKey('DWY43nRas6vu3kiFFUEDwFFLxFZMPG3oBTKBhSBYRwZ2'),
      invert: true
    }, // 8 dec HNT
    '2Koqru6oQmNRWiw9M1JMh3gVboPsfh2s6kh7Cgwz9SBb': {
      key: new PublicKey('854TfhZiF8kE8SzPqnW9eNmi4KsohxoKpKfTfpVejGqK'),
      invert: true
    }, // 5 dec BONK
    CZPL3GNVuYELeSJYoreN4MhiieDaJX2ooR2wjsnLu9nX: {
      key: new PublicKey('SQaa3NMcuVuSyFzw6T8oWPUGNPGMMwCc2udvVycwMnM'),
      invert: false
    }, // 6 dec PYTH
    '3mqUMjrvHPhJj97Ks7Z1msp1Xb1HAfYDbGsXkbMET7qo': {
      key: new PublicKey('E2RyGjCYDycw9sQV3Kgv5VTLaLbHQdauj48C2s9px9n1'),
      invert: true
    }, // 6 dec RAY
    ArUaz7YBGZ3Z5Ut1VNLLEuYV2P1dM9FWmwxf6XMxTbCy: {
      key: new PublicKey('35CL1SSYW3gNey4ptMAURa6MChE7ykvwKsyLQ6avAotJ'),
      invert: true
    }, // 9 dec JTO
    '4z5zhHoGTV1zmjgSfMJKcFHBvxRY5XMheFopNPm5mszJ': {
      key: new PublicKey('EF2F1VRfMe2FzKwfHYbEhA4qqLdLwdCkQSXRvH5vhLPt'),
      invert: true
    } // 6 dec WIF
  }
};

export const classicPortfolioTokens = [
  {
    key: new PublicKey('FibETkfHcCF7Brxn1TryCtD6Z6KAjQgF1VtjfRRS4KQy'), // BTC
    percent: 300,
    decimals: 8
  },
  {
    key: new PublicKey('So11111111111111111111111111111111111111112'), // SOL
    percent: 200,
    decimals: 9
  },
  {
    key: new PublicKey('NftTPJXniF2Pqfw15HWfn1NfoNa36LgnWi7DCoWmKzC'), // ETH
    percent: 150,
    decimals: 8
  },
  {
    key: new PublicKey('BaRCAG2Jw7pyNbDMgaj2vrZGhRrXWpFzSZgoPQ1CyFkL'), // JUP
    percent: 100,
    decimals: 6
  },
  {
    key: new PublicKey('JCdkWwFwLj1g9XGFmEqUT5sUroy71auNtwQCLUZNAmBN'), // RNDR
    percent: 100,
    decimals: 8
  },
  {
    key: new PublicKey('7a8BuU2PTLMCfoCLZkWsmgKZUxk9NTDTsH99QdJnAHRE'), // HNT
    percent: 50,
    decimals: 8
  },
  {
    key: new PublicKey('EuMqSBjc6m34CBGyeHGi9aV81iC8uRTgMb1V273cWdeq'), // BONK
    percent: 50,
    decimals: 5
  },
  {
    key: new PublicKey('9F7rpeDN3aakcAhNMdH43EST4desvLBWdme3s3ZSyGr6'), // PYTH
    percent: 50,
    decimals: 6
  }
];

export const ecosystemPortfolioTokens = [
  {
    key: new PublicKey('So11111111111111111111111111111111111111112'), // SOL
    percent: 300,
    decimals: 9
  },
  {
    key: new PublicKey('BaRCAG2Jw7pyNbDMgaj2vrZGhRrXWpFzSZgoPQ1CyFkL'), // JUP
    percent: 150,
    decimals: 6
  },
  {
    key: new PublicKey('JCdkWwFwLj1g9XGFmEqUT5sUroy71auNtwQCLUZNAmBN'), // RNDR
    percent: 150,
    decimals: 8
  },
  {
    key: new PublicKey('7a8BuU2PTLMCfoCLZkWsmgKZUxk9NTDTsH99QdJnAHRE'), // HNT
    percent: 150,
    decimals: 8
  },
  {
    key: new PublicKey('EuMqSBjc6m34CBGyeHGi9aV81iC8uRTgMb1V273cWdeq'), // BONK
    percent: 100,
    decimals: 5
  },
  {
    key: new PublicKey('9F7rpeDN3aakcAhNMdH43EST4desvLBWdme3s3ZSyGr6'), // PYTH
    percent: 50,
    decimals: 6
  },
  {
    key: new PublicKey('3krnbdBdvzrZDR34BBwUA4ttxNJ5Jf9EGuFZViuJZZw2'), // RAY
    percent: 50,
    decimals: 6
  },
  {
    key: new PublicKey('2BjvT8iM9AQJsHXWDy2nuvzEu8yjCP4rL98VS89YTibw'), // JTO
    percent: 50,
    decimals: 9
  },
  {
    key: new PublicKey('75hBcTeGiJ6xQRfVF3xvfX9eWhqsuK9B5kpEXjBWjehE'), // WIF
    percent: 50,
    decimals: 6
  }
];

export const classicPotrfolioId = 1;
export const ecosystemPortfolioId = 2;
