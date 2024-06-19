import { ProjectType } from '@/lib/types';
import { currencyFormatter } from '@/lib/utils';
import classicCase from '@/assets/images/classicCase.webp';
import ecosystemCase from '@/assets/images/ecosystemCase.webp';
import classicEarnCase from '@/assets/images/classicEarnCase.webp';

export const classicHoldings = {
  holdings: {
    title: 'Holdings',
    items: [
      {
        name: 'BTC',
        percent: 30
      },
      {
        name: 'SOL',
        percent: 20
      },
      {
        name: 'ETH',
        percent: 15
      },
      {
        name: 'JUP',
        percent: 10
      },
      {
        name: 'RNDR',
        percent: 10
      },
      {
        name: 'HNT',
        percent: 5
      },
      {
        name: 'BONK',
        percent: 5
      },
      {
        name: 'PYTH',
        percent: 5
      }
    ]
  }
};

export const ecosystemHoldings = {
  holdings: {
    title: 'Holdings',
    items: [
      {
        name: 'SOL',
        percent: 30
      },
      {
        name: 'JUP',
        percent: 15
      },
      {
        name: 'RNDR',
        percent: 15
      },
      {
        name: 'HNT',
        percent: 15
      },
      {
        name: 'BONK',
        percent: 10
      },
      {
        name: 'PYTH',
        percent: 5
      },
      {
        name: 'RAY',
        percent: 5
      },
      {
        name: 'JTO',
        percent: 5
      },
      {
        name: 'WIF',
        percent: 5
      }
    ]
  }
};

interface GetCardsDataArgs {
  projectList?: ProjectType[];
  classicInvested?: number;
  ecosystemInvested?: number;
  isLoadingClassic: boolean;
  isLoadingEcosystem: boolean;
}

export const getCardsData = ({
  projectList,
  classicInvested,
  ecosystemInvested,
  isLoadingClassic,
  isLoadingEcosystem
}: GetCardsDataArgs) => {
  return [
    {
      title: 'classic',
      badges: [],
      content: {
        amount: {
          title: 'Total amount invested',
          number: isLoadingClassic ? 'Calculation...' : currencyFormatter(classicInvested ?? 0)
        },
        ...classicHoldings
      },
      linkPath: `/classic/${projectList?.find((item) => item.name === 'Classic')?.id ?? ''}`,
      buttonVariant: 'accent',
      progressVariant: 'classic',
      amountVariant: 'bordered',
      backgroundImage: classicCase
    },
    {
      title: 'solana ecosystem',
      badges: [],
      content: {
        amount: {
          title: 'Total amount invested',
          number: isLoadingEcosystem ? 'Calculation...' : currencyFormatter(ecosystemInvested ?? 0)
        },
        ...ecosystemHoldings
      },
      linkPath: `/solana/${projectList?.find((item) => item.name === 'Solana Ecosystem')?.id ?? ''}`,
      buttonVariant: 'accent',
      progressVariant: 'solana',
      amountVariant: 'bordered',
      backgroundImage: ecosystemCase
    },
    {
      title: 'classic + earn',
      badges: ['Landing', 'Staking', 'Vaults'],
      content: {
        amount: {
          title: 'Total amount invested',
          number: 'Coming soon...'
        },
        holdings: {
          title: 'Holdings',
          items: [
            {
              name: 'BTC',
              percent: 30
            },
            {
              name: 'SOL',
              percent: 20
            },
            {
              name: 'ETH',
              percent: 15
            },
            {
              name: 'JUP',
              percent: 10
            },
            {
              name: 'RNDR',
              percent: 10
            },
            {
              name: 'HNT',
              percent: 5
            },
            {
              name: 'BONK',
              percent: 5
            },
            {
              name: 'PYTH',
              percent: 5
            }
          ]
        }
      },
      linkPath: '/classic-earn',
      buttonVariant: 'muted',
      progressVariant: 'classicEarn',
      amountVariant: 'bordered',
      backgroundImage: classicEarnCase
    }
  ];
};
