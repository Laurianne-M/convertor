import type EnvironmentService from "./EnvironmentService.js";

/**
 * Dependencies required by EnvironmentServiceImpl.
 */
export interface EnvironmentServiceDependencies {
  /**
   * Key-value pairs representing environment variables.
   */
  env: Record<string, string | undefined>;
}

const DEFAULT_DEPENDENCIES: EnvironmentServiceDependencies = {
  env: process.env,
};

/**
 * Implementation of the EnvironmentService interface.
 * Validates and provides access to environment variables and formatted API URL.
 */
export class EnvironmentServiceImplV2 implements EnvironmentService {
  private readonly env: Record<string, string | undefined>;
  private readonly exchangeRatesBaseURL: string;
  private readonly exchangeRatesAPIKey: string;

  /**
   * Initializes the service and validates required environment variables.
   * @param {EnvironmentServiceDependencies} dependencies Service dependencies.
   */
  constructor(
    dependencies: EnvironmentServiceDependencies = DEFAULT_DEPENDENCIES,
  ) {
    this.env = dependencies.env;
    this.exchangeRatesBaseURL = this.readAPIURL();
    this.exchangeRatesAPIKey = this.readAPIKey();
  }

  /**
   * Validates and returns the exchange rates API base URL.
   * @return {string} Validated API base URL without a trailing slash.
   */
  private readAPIURL(): string {
    const exchangeRatesBaseURL = this.env.EXCHANGE_RATES_API_URL;

    if (!exchangeRatesBaseURL) {
      throw new Error(
        "[Environment Service] Missing required environment variable: " +
         "EXCHANGE_RATES_API_URL"
      );
    }

    // TODO: Log invalid URL details once the logger service PR is added.
    new URL(exchangeRatesBaseURL);

    if (exchangeRatesBaseURL.endsWith("/")) {
      throw new Error(
        "[Environment Service] " +
        "EXCHANGE_RATES_API_URL must not end with a trailing slash"
      );
    }

    return exchangeRatesBaseURL;
  }

  /**
   * Validates and returns the exchange rates API key.
   * @return {string} Non-empty exchange rates API key.
   */
  private readAPIKey(): string {
    const exchangeRatesAPIKey = this.env.EXCHANGE_RATES_API_KEY;

    if (!exchangeRatesAPIKey) {
      throw new Error(
        "[Environment Service] " +
        "Missing required environment variable: EXCHANGE_RATES_API_KEY"
      );
    }

    return exchangeRatesAPIKey;
  }

  /**
   * Builds the full exchange rates endpoint URL with the access key query.
   * @return {string} Formatted exchange rates API URL.
   */
  getExchangeRatesURL(): string {
    const params = new URLSearchParams({access_key: this.exchangeRatesAPIKey});
    return `${this.exchangeRatesBaseURL}/v1/latest?${params.toString()}`;
  }
}
