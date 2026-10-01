import type { EnvironmentService } from "./EnvironmentService";

/**
 * Implementation of the EnvironmentService interface.
 * Validates and provides access to environment variables and fully formatted API URLs.
 */ 
export class EnvironmentServiceImpl implements EnvironmentService {
  private readonly exchangeRatesURL: string; 
  private readonly exchangeRatesApiKey: string; 

  constructor() {
    const exchangeRatesURL = import.meta.env.VITE_API_URL;
    const exchangeRatesApiKey = import.meta.env.VITE_EXCHANGE_RATES_API_KEY;

    if (!exchangeRatesURL) {
      throw new Error("[Environment Service] Missing required environment variable: VITE_API_URL");
    }

    if (!exchangeRatesApiKey) {
      throw new Error("[Environment Service] Missing required environment variable: VITE_EXCHANGE_RATES_API_KEY");
    }

    try {
      new URL(exchangeRatesURL);
    } catch {
      throw new Error(`[Environment Service] Invalid URL format for VITE_API_URL: "${exchangeRatesURL}"`);
    }

    this.exchangeRatesURL = exchangeRatesURL;
    this.exchangeRatesApiKey = exchangeRatesApiKey;
  }

  getExchangeRatesURL(): string {
    const cleanBaseUrl = this.exchangeRatesURL.replace(/\/$/, '');
    const params = new URLSearchParams({ access_key: this.exchangeRatesApiKey });
    return `${cleanBaseUrl}/v1/latest?${params.toString()}`;
  }
}