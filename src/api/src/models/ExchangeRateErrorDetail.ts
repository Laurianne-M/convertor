import { ExchangeRateErrorType } from "./ExchangeRateErrorType.js";
import { HTTPStatusCode } from "./HTTP.js";

/**
 * Detailed information about an API error response.
 */
export interface ExchangeRateErrorDetail {

  /**
   * Numeric error identifier.
   * Uses ExchangeRateErrorCode when known, or fallbacks to number.
   */
  code: HTTPStatusCode | number;

  /**
   * String type key identifying the category of error.
   * Uses ExchangeRateErrorType when known, or fallbacks to string.
   */
  type: ExchangeRateErrorType | string;

  /** Explanation or context regarding the error. */
  info?: string;
}
