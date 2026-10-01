/**
 * The environment service interface.
 */
export interface EnvironmentService {

  /**
   * Returns the base API URL for exchange rates.
   * @returns The base exchange rates API URL.
   */
  getExchangeRatesURL(): string;
}