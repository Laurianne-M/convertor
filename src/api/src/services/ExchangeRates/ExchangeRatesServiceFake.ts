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


  constructor(
    data: ExchangeRateAPIResponse = TestData.responses.success,
    status: number = 200,
    error: Error | null = null
  ) {
    this.data = data;
    this.status = status;
    this.error = error;
  }

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
        { status: this.status }
      ),
    };
  }
}
