import type EnvironmentService from "./EnvironmentService.ts";
import type { EnvironmentServiceDependencies } from "./EnvironmentService.ts";

/**
 * Implementation of the EnvironmentService interface.
 * Validates and provides access to environment variables and fully formatted API URLs.
 */
export class EnvironmentServiceImpl implements EnvironmentService {
  private readonly exchangeRatesBaseURL: string;
  private readonly exchangeRatesAPIKey: string;

  constructor(_dependencies: EnvironmentServiceDependencies = {}) {
    this.exchangeRatesBaseURL = this.readAPIURL();
    this.exchangeRatesAPIKey = this.readAPIKey();
  }

  private readAPIURL(): string {
    const exchangeRatesBaseURL = process.env.API_URL;

    if (!exchangeRatesBaseURL) {
      throw new Error("[Environment Service] Missing required environment variable: API_URL");
    }

    try {
      new URL(exchangeRatesBaseURL);
    } catch (error) {
      throw error;
    }

    return exchangeRatesBaseURL;
  }

  private readAPIKey(): string {
    const exchangeRatesAPIKey = process.env.EXCHANGE_RATES_API_KEY;

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