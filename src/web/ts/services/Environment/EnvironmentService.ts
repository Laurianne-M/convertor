/**
 * The environment service interface.
 */
export interface EnvironmentService {

  /**
   * Returns the base API URL for exchange rates.
   */
  getExchangeRatesURL(): string;

  /**
   * Returns the API key for exchange rates.
   */
  getExchangeRatesApiKey(): string;

  /**
   * Returns the fully constructed URL for fetching latest exchange rates,
   * including endpoint path and any required auth query parameters.
   */
  getLatestExchangeRatesURL(): string;
}