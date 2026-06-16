import type { TimeProvider } from "../TimeProvider/TimeProviderService";
import { ExchangeRate } from "./ExchangeRateFallbackData";
import type { ExchangeRateService, ExchangeRates } from "./ExchangeRateService";

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
