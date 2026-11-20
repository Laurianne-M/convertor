/**
 * Dependencies required by EnvironmentServiceImpl.
 */
export interface EnvironmentServiceDependencies {}

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
