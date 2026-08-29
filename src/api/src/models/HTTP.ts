
/**
 * Error codes returned by the upstream Exchange Rate API and internal service.
 */

export enum HTTPStatusCode {
  /** Request succeeded. */
  SUCCESS = 200,

  /** The user supplied an invalid access key. */
  INVALID_ACCESS_KEY = 401,

  /** No access key was provided in the request. */
  MISSING_ACCESS_KEY = 400,

  /** Internal server error or network connection error. */
  INTERNAL_SERVER_ERROR = 500
}
