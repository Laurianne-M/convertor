/**
 * Machine-readable string identifiers for specific error categories.
 */
export enum ExchangeRateErrorType {
  /** Invalid API access key provided. */
  INVALID_ACCESS_KEY = "invalid_access_key",

  /** Access key query parameter was missing. */
  MISSING_ACCESS_KEY = "missing_access_key",

  /** Internal server error. */
  INTERNAL_SERVER_ERROR = "internal_server_error"
}
