import type { TimeProvider } from "../TimeProvider/TimeProviderService";
import { ExchangeRate } from "./ExchangeRateFallbackData";
import type { ExchangeRateService, ExchangeRates } from "./ExchangeRateService";

export const TEST_EXCHANGE_RATES_FAKE_OVERRIDES: ExchangeRateServiceFakeOverrides = {
  rates: {
    rates: {
      USD: 1.1,
      EUR: 1.0,
      GBP: 0.85,
      JPY: 162.4,
      CAD: 1.48,
      AUD: 1.66,
      BTC: 0.000015,
      XAU: 0.00047,
      XAG: 0.038
    },
    base: 'EUR'
  }
}

export interface ExchangeRateServiceFakeOverrides {
  rates?: ExchangeRates
  error?: Error
}

export class ExchangeRateServiceFake implements ExchangeRateService {
  public overrides: ExchangeRateServiceFakeOverrides;
  private readonly timeProvider

  constructor(
    overrides: ExchangeRateServiceFakeOverrides = {},
    timeProvider: TimeProvider
  ) {
    this.overrides = overrides
    this.timeProvider = timeProvider
  }

  loadRates = async (): Promise<ExchangeRates> => {  
    if (this.overrides.error) {
      return Promise.reject(this.overrides.error)
    } else {
      let rates = this.overrides.rates
        ? this.overrides.rates
        : ExchangeRate.fallbackData(this.timeProvider)
      
      return Promise.resolve(rates)
    }
  }
}
