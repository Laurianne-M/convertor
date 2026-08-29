import { ExchangeRateErrorResponse } from "./ExchangeRateErrorResponse.js";
import { ExchangeRateSuccessResponse } from "./ExchangeRateSuccessResponse.js";

/**
 * Union of all possible responses returned by the Exchange Rate API.
 */

export type ExchangeRateAPIResponse = ExchangeRateSuccessResponse |
  ExchangeRateErrorResponse;
