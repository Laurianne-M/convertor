/**
 * The environment service interface.
 */
interface EnvironmentService {

  /**
   * Returns the URL for the exchange rates service.
   * @returns The URL for the exchange rates service.
   */
  getExchangeRatesURL(): string;
}

export default EnvironmentService;
