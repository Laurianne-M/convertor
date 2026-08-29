import { ExchangeRateErrorDetail } from "./ExchangeRateErrorDetail.js";

/** Response object returned when an exchange rate request fails. */
export interface ExchangeRateErrorResponse {
  /** Indicates that the API request failed. */
  success: false;

  /** Nested detail object containing the error code, type, and description. */
  error: ExchangeRateErrorDetail;
}
