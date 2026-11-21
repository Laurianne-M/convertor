import type EnvironmentService from "./EnvironmentService.ts";

/**
 * Dependencies required by EnvironmentServiceImpl.
 */
export interface EnvironmentServiceDependencies {
  /** Key-value pairs representing environment variables available during initialization. */
  env?: Record<string, string | undefined>;
}

/**
 * Implementation of the EnvironmentService interface.
 * Validates and provides access to environment variables and fully formatted API URLs.
 */
export class EnvironmentServiceImpl implements EnvironmentService {
  private readonly env: Record<string, string | undefined>;
  private readonly exchangeRatesBaseURL: string;
  private readonly exchangeRatesAPIKey: string;
  
  constructor(dependencies: EnvironmentServiceDependencies = {}) {
    this.env = dependencies.env ?? process.env;
    this.exchangeRatesBaseURL = this.readAPIURL();
    this.exchangeRatesAPIKey = this.readAPIKey();
  }

  private readAPIURL(): string {
    const exchangeRatesBaseURL = this.env.EXCHANGE_RATES_API_URL;

    if (!exchangeRatesBaseURL) {
      throw new Error("[Environment Service] Missing required environment variable: EXCHANGE_RATES_API_URL");
    }

    try {
      new URL(exchangeRatesBaseURL);
    } catch (error) {
      throw error;
    }

    return exchangeRatesBaseURL;
  }

  private readAPIKey(): string {
    const exchangeRatesAPIKey = this.env.EXCHANGE_RATES_API_KEY;

    if (!exchangeRatesAPIKey) {
      throw new Error("[Environment Service] Missing required environment variable: EXCHANGE_RATES_API_KEY");
    }

    return exchangeRatesAPIKey;
  }

  getExchangeRatesURL(): string {
    const cleanBaseUrl = this.exchangeRatesBaseURL.replace(/\/$/, "");
    const params = new URLSearchParams({ access_key: this.exchangeRatesAPIKey });
    return `${cleanBaseUrl}/v1/latest?${params.toString()}`;
  }
}