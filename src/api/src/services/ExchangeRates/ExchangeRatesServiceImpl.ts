import ExchangeRatesService from "./ExchangeRatesService.js";

export default class ExchangeRatesServiceImpl implements ExchangeRatesService {
  private fetchFn: typeof fetch;

  constructor(fetchFn: typeof fetch) {
    this.fetchFn = fetchFn;
  }

  async getExchangeRates(): Promise<{ data: any; response: Response }> {
    const API_KEY = process.env.VITE_EXCHANGE_RATES_API_KEY;
    const BASE_URL =
      `https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;

    const response = await this.fetchFn(BASE_URL);
    const data = await response.json();

    return { data, response };
  }
}

/**
 * Fetches the latest exchange rates from the upstream API provider.
 * @param {Function} [fetchFn] - Optional fetch implementation,
 * defaults to global `fetch`. Used for dependency injection in tests.
 * @return {Promise<{ data: any, response: Response }>} - A promise resolving to
 * an object containing the response data and the original Response object.
 */
export const getExchangeRates = async (fetchFn: typeof fetch = fetch) => {
  const API_KEY = process.env.VITE_EXCHANGE_RATES_API_KEY;
  const BASE_URL = `https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;

  const response = await fetchFn(BASE_URL);
  const data = await response.json();

  return { data, response };
};
