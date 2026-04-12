import type { ExchangeRates, ExchangeRateAPIResponse } from "./ExchangeRateService";

export namespace ExchangeRate {
    export const fallbackData: ExchangeRateAPIResponse = {
        success: true,
        timestamp: Date.now(),
        base: "EUR",
        date: "2026-03-12",
        rates: {
            USD: 1.09,
            EUR: 1,
            GBP: 0.86,
            JPY: 162.4,
            CAD: 1.48,
            AUD: 1.66,
            BTC: 0.000015,
            XAU: 0.00047,
            XAG: 0.038
        }
    } as const
}