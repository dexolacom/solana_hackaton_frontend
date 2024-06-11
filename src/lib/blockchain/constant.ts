import idl from "@/lib/blockchain/programData/idl.json";
import { clusterApiUrl, PublicKey, Connection } from "@solana/web3.js";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

export const commitmentLevel = "confirmed";
export const endpoint =
  "https://solana-devnet.g.alchemy.com/v2/VERaxcMMFR84w2yCPfcC3zncSv4Nwegn";

export const endpointDevNet = clusterApiUrl("devnet");
export const connection = new Connection(endpoint, commitmentLevel);
export const connectionDevNet = new Connection(endpointDevNet, commitmentLevel);

export const umi = createUmi(endpoint).use(mplTokenMetadata());

export const programId = new PublicKey(idl.metadata.address);

export const classicProgramInterface = JSON.parse(JSON.stringify(idl));

export const addressClassicCollection =
  "4R3AXjBh9aWRXUPFDeQMoKH21LqHbFeupMCwBjZkNKhJ";
export const addressEcosystemCollection =
  "zr24szrS9LJs37gx1rZJDiCRunsA5Cstk9yV69VbgTy";

export const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

export const portfolioLookupTable = new PublicKey(
  "GAvAbmJH9ZbsBxqHkQaE7Rtc4a6QHRANc3KhHx416uAN"
);
export const treasury = new PublicKey(
  "8QdnKN4JbhpSLdhJVcCswmSy3X1Z3hmyZEG3VvGGNHn7"
);

export const coins = [
  {
    currency: "USDC",
    mint: "BhKhpfHuHvcLtteqDidKrzAtCbjDMSu6P2PDF7vFCsSe",
    decimals: 10e6,
  },
  {
    currency: "ETH",
    mint: "4AJv9M5uMrMbyArp9Tio9MR2WovY9r5F8MXdQLRyDHaC",
    decimals: 10e8,
  },
  {
    currency: "BTC",
    mint: "7u8NENSnY1k6vH6HERBvJvCjqkpwFHGTnxzmwEAvbMng",
    decimals: 10e8,
  },
  {
    currency: "SOL",
    mint: "So11111111111111111111111111111111111111112",
    decimals: 10e9,
  },
  {
    currency: "JUP",
    mint: "B9L1ksf9U7fyWJcb6oEUs9NQjar3gYWPTrG23phHdHcm",
    decimals: 10e6,
  },
  {
    currency: "RNDR",
    mint: "7nXViVzM7ehQZ5y5Jg6nBjPkpfcXPUyi2JEo6NiwzgHx",
    decimals: 10e8,
  },
  {
    currency: "HNT",
    mint: "Au69YNzR39wDY2MEVFUFakmiEYzmpS7bjJyJdkiatRwJ",
    decimals: 10e8,
  },
  {
    currency: "BONK",
    mint: "2Koqru6oQmNRWiw9M1JMh3gVboPsfh2s6kh7Cgwz9SBb",
    decimals: 10e5,
  },
  {
    currency: "PYTH",
    mint: "CZPL3GNVuYELeSJYoreN4MhiieDaJX2ooR2wjsnLu9nX",
    decimals: 10e6,
  },
  {
    currency: "RAY",
    mint: "3mqUMjrvHPhJj97Ks7Z1msp1Xb1HAfYDbGsXkbMET7qo",
    decimals: 10e6,
  },
  {
    currency: "JTO",
    mint: "ArUaz7YBGZ3Z5Ut1VNLLEuYV2P1dM9FWmwxf6XMxTbCy",
    decimals: 10e9,
  },
  {
    currency: "WIF",
    mint: "4z5zhHoGTV1zmjgSfMJKcFHBvxRY5XMheFopNPm5mszJ",
    decimals: 10e6,
  },
];

export const WHIRLPOOLS = {
  ["BhKhpfHuHvcLtteqDidKrzAtCbjDMSu6P2PDF7vFCsSe"]: {
    // USDC
    "4AJv9M5uMrMbyArp9Tio9MR2WovY9r5F8MXdQLRyDHaC": {
      key: new PublicKey("Axjcsj6x8USndCEfXXQTRsJqJeuQGgipENGgEVmHtrPD"),
      invert: true,
    }, // 8 dec ETH
    "7u8NENSnY1k6vH6HERBvJvCjqkpwFHGTnxzmwEAvbMng": {
      key: new PublicKey("BUuunRGciN47Vg83mfbY7KVCbY2CJKMiUVqNTRfzL6sK"),
      invert: true,
    }, // 8 dec BTC
    So11111111111111111111111111111111111111112: {
      key: new PublicKey("HbeqPBsAn57EUs9BJar8KorKG7VreBZrKM4QnhYEuFM9"),
      invert: true,
    }, // 9 dec SOL
    B9L1ksf9U7fyWJcb6oEUs9NQjar3gYWPTrG23phHdHcm: {
      key: new PublicKey("9VLZPnjeT2dtDYRFeA3SuypRAXxyrgzfqV32Fk1HXR8a"),
      invert: true,
    }, // 6 dec JUP
    "7nXViVzM7ehQZ5y5Jg6nBjPkpfcXPUyi2JEo6NiwzgHx": {
      key: new PublicKey("94U4aoAsXHqKGt2D4Subhf78sHWfQoqBWRtKZmnFWYJA"),
      invert: true,
    }, // 8 dec RNDR
    Au69YNzR39wDY2MEVFUFakmiEYzmpS7bjJyJdkiatRwJ: {
      key: new PublicKey("DWY43nRas6vu3kiFFUEDwFFLxFZMPG3oBTKBhSBYRwZ2"),
      invert: true,
    }, // 8 dec HNT
    "2Koqru6oQmNRWiw9M1JMh3gVboPsfh2s6kh7Cgwz9SBb": {
      key: new PublicKey("854TfhZiF8kE8SzPqnW9eNmi4KsohxoKpKfTfpVejGqK"),
      invert: true,
    }, // 5 dec BONK
    CZPL3GNVuYELeSJYoreN4MhiieDaJX2ooR2wjsnLu9nX: {
      key: new PublicKey("SQaa3NMcuVuSyFzw6T8oWPUGNPGMMwCc2udvVycwMnM"),
      invert: false,
    }, // 6 dec PYTH
    "3mqUMjrvHPhJj97Ks7Z1msp1Xb1HAfYDbGsXkbMET7qo": {
      key: new PublicKey("E2RyGjCYDycw9sQV3Kgv5VTLaLbHQdauj48C2s9px9n1"),
      invert: true,
    }, // 6 dec RAY
    ArUaz7YBGZ3Z5Ut1VNLLEuYV2P1dM9FWmwxf6XMxTbCy: {
      key: new PublicKey("35CL1SSYW3gNey4ptMAURa6MChE7ykvwKsyLQ6avAotJ"),
      invert: true,
    }, // 9 dec JTO
    "4z5zhHoGTV1zmjgSfMJKcFHBvxRY5XMheFopNPm5mszJ": {
      key: new PublicKey("EF2F1VRfMe2FzKwfHYbEhA4qqLdLwdCkQSXRvH5vhLPt"),
      invert: true,
    }, // 6 dec WIF
  },
};

export const classicPortfolioTokens = [
  {
    key: new PublicKey("7u8NENSnY1k6vH6HERBvJvCjqkpwFHGTnxzmwEAvbMng"), // BTC
    percent: 350,
  },
  {
    key: new PublicKey("So11111111111111111111111111111111111111112"), // SOL
    percent: 250,
  },
  {
    key: new PublicKey("4AJv9M5uMrMbyArp9Tio9MR2WovY9r5F8MXdQLRyDHaC"), // ETH
    percent: 200,
  },
  {
    key: new PublicKey("B9L1ksf9U7fyWJcb6oEUs9NQjar3gYWPTrG23phHdHcm"), // JUP
    percent: 200,
  },
  // {
  //   key: new PublicKey("7nXViVzM7ehQZ5y5Jg6nBjPkpfcXPUyi2JEo6NiwzgHx"), // RNDR
  //   percent: 100
  // },
  // {
  //   key: new PublicKey("Au69YNzR39wDY2MEVFUFakmiEYzmpS7bjJyJdkiatRwJ"), // HNT
  //   percent: 50
  // },
  // {
  //   key: new PublicKey("2Koqru6oQmNRWiw9M1JMh3gVboPsfh2s6kh7Cgwz9SBb"), // BONK
  //   percent: 50
  // },
  // {
  //   key: new PublicKey("CZPL3GNVuYELeSJYoreN4MhiieDaJX2ooR2wjsnLu9nX"), // PYTH
  //   percent: 50
  // }
];

export const classicPotrfolioId = 3;
export const ecosystemPortfolioId = 2;
