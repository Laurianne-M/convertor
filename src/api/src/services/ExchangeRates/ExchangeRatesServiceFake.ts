import ExchangeRatesService from "./ExchangeRatesService.js";
import {TestData} from "../../models/testing/TestData.js";
import {ExchangeRateAPIResponse} from "../../models/ExchangeRateAPIResponse.js";
/**
 * Fake implementation of ExchangeRatesService for testing.
 */
export class ExchangeRatesServiceFake implements ExchangeRatesService {
  public data: ExchangeRateAPIResponse;
  public status: number;
  public error: Error | null;

  /**
   * Initializes a mock instance of the ExchangeRatesService.
   * @param {ExchangeRateAPIResponse} data - The mock exchange rate response.
   * @param {number} status - The HTTP status code to simulate.
   * @param {Error | null} error - Optional error to throw upon invocation.
   */
  constructor(
    data: ExchangeRateAPIResponse = TestData.responses.success,
    status = 200,
    error: Error | null = null
  ) {
    this.data = data;
    this.status = status;
    this.error = error;
  }

  /**
   * Retrieves mock exchange rates or throws a configured error.
   * @return {Promise<{data: ExchangeRateAPIResponse, response: Response}>} The
   * mock exchange rates payload and response object.
   */
  async getExchangeRates(): Promise<{
    data: ExchangeRateAPIResponse;
    response: Response
  }> {
    if (this.error) {
      throw this.error;
    }

    return {
      data: this.data,
      response: new Response(
        JSON.stringify(this.data),
        {status: this.status}
      ),
    };
  }
}
