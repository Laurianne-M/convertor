/**
 * The environment service interface.
 */
export interface EnvironmentService {

  /**
   * Returns the base API URL for exchange rates.
   * @returns The base exchange rates API URL.
   */
  getExchangeRatesURL(): string;

  /**
   * Returns the API key for exchange rates.
   * @returns The exchange rates API key.
   */
  getExchangeRatesApiKey(): string;

  /**
   * Returns the fully constructed URL for fetching latest exchange rates,
   * including endpoint path and any required auth query parameters.
   * @returns The complete URL for latest exchange rates.
   */
  getLatestExchangeRatesURL(): string;
}