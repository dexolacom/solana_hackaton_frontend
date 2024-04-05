import { classicHoldings, ecosystemHoldings } from "@/components/common/HomeCardsContainer/lib";

export type HoldingsFilterType = 'all' | 'classic' | 'ecosystem'

interface TempDataType {
  title: string,
  amount: {
    title: string,
    number: string,
  },
  holdings: {
    title: string,
    items: {
      name: string,
      percent: number,
    }[]
  },
  amountCardVariant: 'accent' | 'bordered' | 'accentTeal' | 'accentGray',
  progressVariant: "classicEarn" | "classic" | "solana" | 'all',
}

const tempData: TempDataType[] = [
  {
    title: 'classic',
    amount: {
      title: 'Current Portfolio Price',
      number: '$1,013,724.41',
    },
    ...classicHoldings,
    amountCardVariant: 'accent',
    progressVariant: 'classic',
  },
  {
    title: 'ecosystem',
    amount: {
      title: 'Current Portfolio Price',
      number: '$1,013,724.41',
    },
    ...ecosystemHoldings,
    amountCardVariant: 'accentTeal',
    progressVariant: 'solana',
  },
  {
    title: 'all',
    amount: {
      title: 'Portfolios Price',
      number: '$1,013,724.41',
    },
    holdings: {
      title: 'Holdings',
      items: [
        {
          name: 'BTC',
          percent: 30,
        },
        {
          name: 'SOL',
          percent: 20,
        },
        {
          name: 'ETH',
          percent: 15,
        },
        {
          name: 'JUP',
          percent: 10,
        },
        {
          name: 'RNDR',
          percent: 10,
        },
        {
          name: 'HNT',
          percent: 5,
        },
        {
          name: 'BONK',
          percent: 5,
        },
        {
          name: 'PYTH',
          percent: 5,
        },
        {
          name: 'RAY',
          percent: 5,
        },
        {
          name: 'JTO',
          percent: 5,
        },
        {
          name: 'WIF',
          percent: 5,
        },
      ],
    },
    amountCardVariant: 'accentGray',
    progressVariant: 'all',
  }
]

export const getHoldingPageData = (variant: HoldingsFilterType) => {
  return tempData.filter(item => item.title === variant)[0];
}