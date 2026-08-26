import { ExchangeRateCode, ExchangeRateErrorType } from "../router.constants.js";

/**
 * Represents exchange rate data relative to a single base currency.
 */
export interface ExchangeRates {
  /**
   * The base currency code against which all exchange rates are calculated (e.g. "EUR").
   */
  base: string;

  /**
   * A dictionary mapping currency codes (e.g., "USD", "GBP") to their exchange rate relative to the base currency.
   */
  rates: Record<string, number>;
}

/**
 * Detailed information about an API error response.
 */
export interface ExchangeRateErrorDetail {

  /**
   * Numeric error identifier.
   * Uses ExchangeRateErrorCode when known, or fallbacks to number.
   */
  code: ExchangeRateCode | number;

  /**
   * String type key identifying the category of error.
   * Uses ExchangeRateErrorType when known, or fallbacks to string.
   */
  type: ExchangeRateErrorType | string;

  /** Explanation or context regarding the error. */
  info?: string;
}

/** Response object returned when an exchange rate request succeeds. */
export interface ExchangeRateSuccessResponse extends ExchangeRates {
  /** Indicates that the API request succeeded. */
  success: true;

  /** Timestamp (in seconds) indicating when the exchange rates were generated. */
  timestamp: number;

  /** The date for which exchange rates were queried in YYYY-MM-DD format. */
  date: string;
}

/** Response object returned when an exchange rate request fails. */
export interface ExchangeRateErrorResponse {
  /** Indicates that the API request failed. */
  success: false;

  /** Nested detail object containing the error code, type, and description. */
  error: ExchangeRateErrorDetail;
}

/**
 * Union of all possible responses returned by the Exchange Rate API.
 */
export type ExchangeRateAPIResponse =
  | ExchangeRateSuccessResponse
  | ExchangeRateErrorResponse;