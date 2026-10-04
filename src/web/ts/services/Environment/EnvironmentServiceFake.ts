import type { EnvironmentService } from "./EnvironmentService";

/**
 * Fake implementation of {@link EnvironmentService} for unit testing.
 *
 * Provides a predictable API endpoint URL without requiring environment
 * variables (`VITE_API_URL` or `VITE_EXCHANGE_RATES_API_KEY`) to be set.
 */
export class EnvironmentServiceFake implements EnvironmentService {
  public exchangeRatesURL: string;

  constructor (
    exchangeRatesURL: string = "https://api.exchangeratesapi.io/v1/latest?access_key=fake_access_key_123"
  ) {
    this.exchangeRatesURL = exchangeRatesURL;
  }

  getExchangeRatesURL(): string {
    return this.exchangeRatesURL;
  }
}