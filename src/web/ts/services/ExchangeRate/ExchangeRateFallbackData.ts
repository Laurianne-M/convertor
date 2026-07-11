import type { ExchangeRateAPIResponse } from "./ExchangeRateService";
import type { TimeProvider } from "../TimeProvider/TimeProviderService";
import { AppConstants } from "../../constants";

export namespace ExchangeRate {
  export const fallbackData = (timeProvider: TimeProvider): ExchangeRateAPIResponse => ({
    success: true,
    timestamp: timeProvider.currentDate().getTime(),
    base: AppConstants.currencies.EUR.code,
    date: timeProvider.currentDate().toISOString().split('T')[0]?? '',
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
  })
}