import {ExchangeRateAPIResponse} from "../../models/ExchangeRateAPIResponse.js";

export const EXCHANGE_RATES_COLLECTION = "exchangeRates";

/**
 * The exchange rates service interface.
 */
interface ExchangeRatesService {

  /**
   * Returns the exchange rates.
   * @returns {Promise<{data: ExchangeRateAPIResponse, response: Response}>}
   * A promise that resolves to an object containing the exchange rates
   * data and the HTTP response.
   */
  getExchangeRates(): Promise<{
    data: ExchangeRateAPIResponse;
    response: Response;
  }>;

  /**
   * Fetches exchange rates and stores a successful response by date.
   * @return {Promise<ExchangeRateAPIResponse>} The stored exchange rates.
   */
  fetchAndStoreExchangeRates(): Promise<ExchangeRateAPIResponse>;
}

export default ExchangeRatesService;
