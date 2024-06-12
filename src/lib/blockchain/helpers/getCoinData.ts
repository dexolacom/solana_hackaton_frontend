import { coins } from "../constant";

export const getCoinData = (currency: string) => {
  return coins.filter(item => item.currency === currency)[0]
}