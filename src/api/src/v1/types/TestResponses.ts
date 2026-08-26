import type { ExchangeRateAPIResponse } from "./responses.js";

/**
 * Mock API responses used for testing different exchange rate scenario paths.
 */
export interface TestResponses {
  /**
   * Response representing a successful exchange rate query (HTTP status 200).
   */
  success: ExchangeRateAPIResponse;

  /**
   * Response representing an internal server or network failure (HTTP status 500).
   */
  internalError: ExchangeRateAPIResponse;

  /**
   *  Response representing an invalid API key error (HTTP status 401).
   */
  unauthorized: ExchangeRateAPIResponse;

  /**
   * Response representing a bad request caused by missing required parameters (HTTP status 400).
   */
  missingParameter: ExchangeRateAPIResponse;
}