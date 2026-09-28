import type { EnvironmentService } from "./EnvironmentService";

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

    this.exchangeRatesURL = exchangeRatesURL;
    this.exchangeRatesApiKey = exchangeRatesApiKey;
  }

  getExchangeRatesURL(): string {
    return this.exchangeRatesURL;
  }

  getExchangeRatesApiKey(): string {
    return this.exchangeRatesApiKey; 
  }
}