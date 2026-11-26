import {ExchangeRateAPIResponse} from "../../models/ExchangeRateAPIResponse.js";
import {ExchangeRateSuccessResponse} from
  "../../models/ExchangeRateSuccessResponse.js";

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

  /**
   * Returns stored exchange rates for an inclusive date range.
   * @param {{startDate: Date, endDate: Date}} dateRange The requested range.
   * @return {Promise<ExchangeRateSuccessResponse[]>} Matching daily rates.
   */
  getHistoricalExchangeRates(dateRange: {
    startDate: Date;
    endDate: Date;
  }): Promise<ExchangeRateSuccessResponse[]>;
}

export default ExchangeRatesService;
