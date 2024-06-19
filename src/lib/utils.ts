import { PublicKey } from '@solana/web3.js';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currencyFormatter = (num: number, fractionDigits?: number) => {
  const currencyOptions = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fractionDigits ?? 0
  };

  const formatter = new Intl.NumberFormat('en-US', currencyOptions);

  return formatter.format(num);
};

export const shortAddress = (publicKey: PublicKey | null): string => {
  const address = publicKey?.toBase58();
  return `${address?.slice(0, 6)}...${address?.slice(-5)}`;
};

export const generateRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 251);
  return randomNumber;
};
