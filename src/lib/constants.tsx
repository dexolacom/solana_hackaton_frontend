import btc from '@/assets/icons/currency/btc.svg'
import eth from '@/assets/icons/currency/eth.svg'
import sol from '@/assets/icons/currency/sol.svg'
import jup from '@/assets/icons/currency/jup.svg'
import rndr from '@/assets/icons/currency/rndr.svg'
import hnt from '@/assets/icons/currency/hnt.svg'
import bonk from '@/assets/icons/currency/bonk.svg'
import pyth from '@/assets/icons/currency/pyth.svg'

export const currencyIcons: Record<string, string> = {
  BTC: btc,
  ETH: eth,
  SOL: sol,
  JUP: jup,
  RNDR: rndr,
  HNT: hnt,
  BONK: bonk,
  PYTH: pyth,
}

export const classicCurrencyInfo = [
  {
    title: 'BTC',
    percent: 0.3,
  },
  {
    title: 'ETH',
    percent: 0.2,
  },
  {
    title: 'SOL',
    percent: 0.15,
  },
  {
    title: 'JUP',
    percent: 0.1,
  },
  {
    title: 'RNDR',
    percent: 0.1,
  },
  {
    title: 'HNT',
    percent: 0.05,
  },
  {
    title: 'BONK',
    percent: 0.05,
  },
  {
    title: 'PYTH',
    percent: 0.05,
  },
]

export const classicTemplate = [
  { symbol: 'BTC', icon: btc, distribution: '30%' },
  { symbol: 'SOL', icon: sol, distribution: '20%' },
  { symbol: 'ETH', icon: eth, distribution: '15%' },
  { symbol: 'JUP', icon: jup, distribution: '10%' },
  { symbol: 'RNDR', icon: rndr, distribution: '10%' },
  { symbol: 'HNT', icon: hnt, distribution: '5%' },
  { symbol: 'BONK', icon: bonk, distribution: '5%' },
  { symbol: 'PYTH', icon: pyth, distribution: '5%' },
]

export const ecosystemTemplate = [
  { symbol: 'SOL', icon: sol, distribution: '30%' },
  { symbol: 'JUP', icon: jup, distribution: '15 %' },
  { symbol: 'RNDR', icon: rndr, distribution: '15%' },
  { symbol: 'HNT', icon: hnt, distribution: '15%' },
  { symbol: 'BONK', icon: bonk, distribution: '10%' },
  { symbol: 'PYTH', icon: pyth, distribution: '5%' },
  { symbol: 'RAY', icon: btc, distribution: '5%' },
  { symbol: 'JTO', icon: eth, distribution: '5%' },
  { symbol: 'WIF', icon: rndr, distribution: '5%' },
]