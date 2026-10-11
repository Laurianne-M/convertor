import type { EnvironmentService } from "./EnvironmentService";
import { TEST_DATA } from "../../tests/TestData";

/**
 * Fake implementation of {@link EnvironmentService} for unit testing.
 *
 * Provides a predictable API endpoint URL without requiring environment
 * variables (`VITE_API_URL` or `VITE_EXCHANGE_RATES_API_KEY`) to be set.
 */
export class EnvironmentServiceFake implements EnvironmentService {
  /**
   * The exchange rates API URL returned by this fake service.
   * Can be modified directly in tests.
   */
  public exchangeRatesURL: string;

  constructor (
    exchangeRatesURL: string = TEST_DATA.DEFAULT_EXCHANGE_RATES_URL
  ) {
    this.exchangeRatesURL = exchangeRatesURL;
  }

  getExchangeRatesURL(): string {
    return this.exchangeRatesURL;
  }
}