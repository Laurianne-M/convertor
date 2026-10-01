import type { LoggerService } from "../Logger/LoggerService";

/**
 * Dependencies required by EnvironmentServiceImpl.
 */
export interface EnvironmentServiceDependencies {
  /**
   * Logger service instance used for internal debug logging.
   */
  logger: LoggerService;
}

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