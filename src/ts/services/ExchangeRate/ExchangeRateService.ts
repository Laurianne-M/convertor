import { currencies } from "../../constants";


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

export type CurrencyCode = keyof typeof currencies;


export interface ExchangeRateAPIResponse extends ExchangeRates {
    success: boolean,
    timestamp: number,
    date: string,
}

export interface ExchangeRates {
    rates: ExchangeRatePairs,
    base: CurrencyCode // TODO - MAKE A TYPE CALLED CurrencyCode THAT ONLY ACCEPTS KNOWN CODES
}

export interface ExchangeRateService {
    loadRates: () => Promise<ExchangeRates>
}