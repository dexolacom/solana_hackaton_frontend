import btc from '@/assets/icons/currency/btc.svg'
import eth from '@/assets/icons/currency/eth.svg'
import sol from '@/assets/icons/currency/sol.svg'
import jup from '@/assets/icons/currency/jup.svg'
import rndr from '@/assets/icons/currency/rndr.svg'
import hnt from '@/assets/icons/currency/hnt.svg'
import bonk from '@/assets/icons/currency/bonk.svg'
import pyth from '@/assets/icons/currency/pyth.svg'
import wif from '@/assets/icons/currency/wif.svg'
import ray from '@/assets/icons/currency/ray.svg'
import jto from '@/assets/icons/currency/jto.svg'

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
  JTO: jto,
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

export const solanaCurrencyInfo = [
  {
    title: 'SOL',
    percent: 0.3,
  },
  {
    title: 'JUP',
    percent: 0.15,
  },
  {
    title: 'RNDR',
    percent: 0.15,
  },
  {
    title: 'HNT',
    percent: 0.15,
  },
  {
    title: 'BONK',
    percent: 0.1,
  },
  {
    title: 'PYTH',
    percent: 0.05,
  },
  {
    title: 'RAY',
    percent: 0.05,
  },
  {
    title: 'JTO',
    percent: 0.05,
  },
  {
    title: 'WIF',
    percent: 0.05,
  },
]
