import type {ExchangeRateAPIResponse} from "./responses.js";

/**
 * Mock API responses used for testing different exchange rate scenario paths.
 */
export interface TestResponses {
  /**
   * Response representing a successful exchange rate query (status 200).
   */
  success: ExchangeRateAPIResponse;

  /**
   * Response representing an internal server or network failure (status 500).
   */
  internalError: ExchangeRateAPIResponse;

  /**
   *  Response representing an invalid API key error (status 401).
   */
  unauthorized: ExchangeRateAPIResponse;

  /**
   * Response representing an error caused by missing parameters (status 400).
   */
  missingParameter: ExchangeRateAPIResponse;
}
