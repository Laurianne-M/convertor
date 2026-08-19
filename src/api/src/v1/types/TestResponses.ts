import type { ExchangeRateAPIResponse } from "./responses.js";

export interface TestResponses {
  success: ExchangeRateAPIResponse;
  internalError: ExchangeRateAPIResponse;
  unauthorized: ExchangeRateAPIResponse;
  missingParameter: ExchangeRateAPIResponse;
}