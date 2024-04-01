import { ProjectType } from "@/lib/types";

export const getCardsData = (projectList?: ProjectType[]) => {
  return [
    {
      title: 'classic',
      badges: [],
      content: {
        amount: {
          title: 'Total amount invested',
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
          ],
        },
        description: {
          title: 'Description',
          text: 'The Classic portfolio is a balanced investment strategy comprising a mix of low-risk and high-risk assets. With allocations across various cryptocurrencies, it aims to optimize returns while managing potential risks effectively.',
        },
      },
      linkPath: `/classic/${projectList?.find((item) => item.name === 'Classic')?.id ?? ''}`,
      buttonVariant: 'accent',
      amountCardVariant: 'accent',
      progressVariant: 'classic',
    },
    {
      title: 'solana ecosystem',
      badges: [],
      content: {
        amount: {
          title: 'Total amount invested',
          number: '$1,013,724.41',
        },
        holdings: {
          title: 'Holdings',
          items: [
            {
              name: 'SOL',
              percent: 30,
            },
            {
              name: 'JUP',
              percent: 15,
            },
            {
              name: 'RNDR',
              percent: 15,
            },
            {
              name: 'HNT',
              percent: 15,
            },
            {
              name: 'BONK',
              percent: 10,
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
        description: {
          title: 'Description',
          text: `The Solana Ecosystem portfolio is tailored for enthusiasts who believe in the Solana network's potential. It comprises assets tied to the Solana ecosystem, providing investors with the opportunity to participate in the network's growth and development.`,
        },
      },
      linkPath: `/solana/${projectList?.find((item) => item.name === 'Solana Ecosystem')?.id ?? ''}`,
      buttonVariant: 'accent',
      amountCardVariant: 'accentTeal',
      progressVariant: 'solana',
    },
    {
      title: 'classic + earn',
      badges: ['Landing', 'Staking', 'Vaults'],
      content: {
        amount: {
          title: 'Total amount invested',
          number: 'Coming soon',
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
          ],
        },
        description: {
          title: 'Description',
          text: 'The Classic + Earn portfolio is a balanced investment strategy comprising a mix of low-risk and high-risk assets. It channels these assets into staking/landing/vaults for additional earning opportunities while aiming to optimize returns.',
        },
      },
      linkPath: '/classic-earn',
      buttonVariant: 'muted',
      amountCardVariant: 'accentGray',
      progressVariant: 'classicEarn',
    },
  ]
}