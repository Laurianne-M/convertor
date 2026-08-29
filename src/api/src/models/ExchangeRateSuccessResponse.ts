import { ExchangeRates } from "./ExchangeRates.js";

/** Response object returned when an exchange rate request succeeds. */
export interface ExchangeRateSuccessResponse extends ExchangeRates {
  /** Indicates that the API request succeeded. */
  success: true;

  /** Timestamp indicating when the exchange rates were generated. */
  timestamp: number;

  /** The date for which exchange rates were queried in YYYY-MM-DD format. */
  date: string;
}
