import type { EnvironmentService, EnvironmentServiceDependencies } from "./EnvironmentService";

/**
 * Implementation of the EnvironmentService interface.
 * Validates and provides access to environment variables and fully formatted API URLs.
 */ 
export class EnvironmentServiceImpl implements EnvironmentService {
  private readonly exchangeRatesURL: string; 
  private readonly exchangeRatesApiKey: string;
  private readonly dependencies: EnvironmentServiceDependencies;

  constructor(dependencies: EnvironmentServiceDependencies) {
    this.dependencies = dependencies;
    const { logger } = this.dependencies;

    logger.debug('[EnvironmentService] Verifying environment variables...');
    logger.debug(`[EnvironmentService] Active Vite Mode: ${import.meta.env.MODE}`);

    logger.debug('[EnvironmentService] Checking for VITE_API_URL...');
    const exchangeRatesURL = import.meta.env.VITE_API_URL;
    if (!exchangeRatesURL) {
      throw new Error("[Environment Service] Missing required environment variable: VITE_API_URL");
    }

    logger.debug('[EnvironmentService] Checking for VITE_EXCHANGE_RATES_API_KEY...');
    const exchangeRatesApiKey = import.meta.env.VITE_EXCHANGE_RATES_API_KEY;
    if (!exchangeRatesApiKey) {
      throw new Error("[Environment Service] Missing required environment variable: VITE_EXCHANGE_RATES_API_KEY");
    }

    logger.debug('[EnvironmentService] Validating VITE_API_URL format...');
    try {
      new URL(exchangeRatesURL);
    } catch {
      throw new Error(`[Environment Service] Invalid URL format for VITE_API_URL: "${exchangeRatesURL}"`);
    }

    this.exchangeRatesURL = exchangeRatesURL;
    this.exchangeRatesApiKey = exchangeRatesApiKey;

    logger.debug('[EnvironmentService] Environment initialization successful.');
  }

  getExchangeRatesURL(): string {
    const cleanBaseUrl = this.exchangeRatesURL.replace(/\/$/, '');
    const params = new URLSearchParams({ access_key: this.exchangeRatesApiKey });
    return `${cleanBaseUrl}/v1/latest?${params.toString()}`;
  }
}