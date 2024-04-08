import { classicHoldings, ecosystemHoldings } from "@/components/common/HomeCardsContainer/lib";
import { currencyFormatter } from "@/lib/utils";

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

interface GetHoldingPageDataArgs {
  variant: HoldingsFilterType
  classicInvested?: number,
  ecosystemInvested?: number,
  isLoadingClassic: boolean,
  isLoadingEcosystem: boolean
}

export const getHoldingPageData = ({ variant,
  classicInvested,
  ecosystemInvested,
  isLoadingClassic,
  isLoadingEcosystem }: GetHoldingPageDataArgs) => {
  const tempData: TempDataType[] = [
    {
      title: 'classic',
      amount: {
        title: 'Current Portfolio Price',
        number: isLoadingClassic ? 'Calculation...' : currencyFormatter(classicInvested ?? 0),
      },
      ...classicHoldings,
      amountCardVariant: 'accent',
      progressVariant: 'classic',
    },
    {
      title: 'ecosystem',
      amount: {
        title: 'Current Portfolio Price',
        number: isLoadingEcosystem ? 'Calculation...' : currencyFormatter(ecosystemInvested ?? 0),
      },
      ...ecosystemHoldings,
      amountCardVariant: 'accentTeal',
      progressVariant: 'solana',
    },
    {
      title: 'all',
      amount: {
        title: 'Portfolios Price',
        number: isLoadingClassic || isLoadingEcosystem ? 'Calculation...' : currencyFormatter((ecosystemInvested ?? 0) + (classicInvested ?? 0)),
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
  return tempData.filter(item => item.title === variant)[0];
}