import { AppConstants } from "../../constants";


export type ExchangeRatePairs = {
  USD: number
  EUR: number
  GBP: number
  JPY: number
  CAD: number
  AUD: number
  BTC: number
  XAU: number
  XAG: number
}

export type CurrencyCode = keyof typeof AppConstants.currencies;


export interface ExchangeRateAPIResponse extends ExchangeRates {
  success: boolean,
  timestamp: number,
  date: string,
}

export interface ExchangeRates {
  rates: ExchangeRatePairs,
  base: CurrencyCode
}

export interface ExchangeRateService {
  loadRates: () => Promise<ExchangeRates>
}