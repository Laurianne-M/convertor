/**
 * The environment service interface.
 */
export default interface EnvironmentService {

  /**
   * Returns the URL for the exchange rates service.
   * @returns The URL for the exchange rates service.
   */
  getExchangeRatesURL(): string;
}