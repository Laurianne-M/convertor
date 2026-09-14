import {ExchangeRateAPIResponse} from "../../models/ExchangeRateAPIResponse.js";

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
}

export default ExchangeRatesService;
