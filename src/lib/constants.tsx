import btc from '@/assets/icons/currency/btc.svg';
import eth from '@/assets/icons/currency/eth.svg';
import sol from '@/assets/icons/currency/sol.svg';
import jup from '@/assets/icons/currency/jup.svg';
import rndr from '@/assets/icons/currency/rndr.svg';
import hnt from '@/assets/icons/currency/hnt.svg';
import bonk from '@/assets/icons/currency/bonk.svg';
import pyth from '@/assets/icons/currency/pyth.svg';
import wif from '@/assets/icons/currency/wif.svg';
import ray from '@/assets/icons/currency/ray.svg';
import jto from '@/assets/icons/currency/jto.svg';

export const currencyIcons: Record<string, string> = {
  BTC: btc,
  ETH: eth,
  SOL: sol,
  JUP: jup,
  RNDR: rndr,
  HNT: hnt,
  BONK: bonk,
  PYTH: pyth,
  WIF: wif,
  RAY: ray,
  JTO: jto
};

export const currencyLinks: Record<string, string> = {
  BTC: 'https://bitcoin.org/en/',
  ETH: 'https://ethereum.org/en/',
  SOL: 'https://solana.com/',
  JUP: 'https://station.jup.ag/',
  RNDR: 'https://rendernetwork.com/',
  HNT: 'https://www.helium.com/',
  BONK: 'https://bonkcoin.com/',
  PYTH: 'https://pyth.network/',
  WIF: 'https://dogwifcoin.org/',
  RAY: 'https://raydium.io/',
  JTO: 'https://www.jito.network/'
};

export const classicCurrencyInfo = [
  {
    title: 'BTC',
    percent: 0.3
  },
  {
    title: 'SOL',
    percent: 0.2
  },
  {
    title: 'ETH',
    percent: 0.15
  },
  {
    title: 'JUP',
    percent: 0.1
  },
  {
    title: 'RNDR',
    percent: 0.1
  },
  {
    title: 'HNT',
    percent: 0.05
  },
  {
    title: 'BONK',
    percent: 0.05
  },
  {
    title: 'PYTH',
    percent: 0.05
  }
];

export const solanaCurrencyInfo = [
  {
    title: 'SOL',
    percent: 0.3
  },
  {
    title: 'JUP',
    percent: 0.15
  },
  {
    title: 'RNDR',
    percent: 0.15
  },
  {
    title: 'HNT',
    percent: 0.15
  },
  {
    title: 'BONK',
    percent: 0.1
  },
  {
    title: 'PYTH',
    percent: 0.05
  },
  {
    title: 'RAY',
    percent: 0.05
  },
  {
    title: 'JTO',
    percent: 0.05
  },
  {
    title: 'WIF',
    percent: 0.05
  }
];

export const classicTemplate = [
  { symbol: 'BTC', icon: btc, distribution: '30%' },
  { symbol: 'SOL', icon: sol, distribution: '20%' },
  { symbol: 'ETH', icon: eth, distribution: '15%' },
  { symbol: 'JUP', icon: jup, distribution: '10%' },
  { symbol: 'RNDR', icon: rndr, distribution: '10%' },
  { symbol: 'HNT', icon: hnt, distribution: '5%' },
  { symbol: 'BONK', icon: bonk, distribution: '5%' },
  { symbol: 'PYTH', icon: pyth, distribution: '5%' }
];

export const ecosystemTemplate = [
  { symbol: 'SOL', icon: sol, distribution: '30%' },
  { symbol: 'JUP', icon: jup, distribution: '15%' },
  { symbol: 'RNDR', icon: rndr, distribution: '15%' },
  { symbol: 'HNT', icon: hnt, distribution: '15%' },
  { symbol: 'BONK', icon: bonk, distribution: '10%' },
  { symbol: 'PYTH', icon: pyth, distribution: '5%' },
  { symbol: 'RAY', icon: ray, distribution: '5%' },
  { symbol: 'JTO', icon: jto, distribution: '5%' },
  { symbol: 'WIF', icon: wif, distribution: '5%' }
];

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
