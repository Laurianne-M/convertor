import { ExchangeRateAPIResponse } from "./types/responses.js";

export const DEFAULT_VALUES = {
  BASE_CURRENCY: "EUR",
  TIMESTAMP: 1787160005,
  DATE: "2026-08-19",
} as const

export const DEFAULT_INFO_MESSAGES = {
  INTERNAL_SERVER_ERROR: "An internal error occurred while processing your request.",
  UNAUTHORIZED: "You have not supplied a valid API Access Key.",
  MISSING_PARAMETER: "You have not supplied an API Access Key.",
} as const;

/**
 * Machine-readable string identifiers for specific error categories.
 */
export enum ExchangeRateErrorType {
  /** Invalid API access key provided. */
  INVALID_ACCESS_KEY = "invalid_access_key",

  /** Access key query parameter was missing. */
  MISSING_ACCESS_KEY = "missing_access_key",

  /** Internal server error. */
  INTERNAL_SERVER_ERROR = "internal_server_error",
}

/**
 * Error codes returned by the upstream Exchange Rate API and internal service.
 */
export enum ExchangeRateCode {
  /** Request succeeded. */
  SUCCESS = 200,

  /** The user supplied an invalid access key. */
  INVALID_ACCESS_KEY = 401,

  /** No access key was provided in the request. */
  MISSING_ACCESS_KEY = 400,

  /** Internal server error or network connection error. */
  INTERNAL_SERVER_ERROR = 500,
}

export const INTERNAL_ERROR_RESPONSE: ExchangeRateAPIResponse = {
  success: false,
  error: {
    code: ExchangeRateCode.INTERNAL_SERVER_ERROR,
    type: ExchangeRateErrorType.INTERNAL_SERVER_ERROR,
    info: DEFAULT_INFO_MESSAGES.INTERNAL_SERVER_ERROR,
  },
};

export const UNAUTHORIZED_RESPONSE: ExchangeRateAPIResponse = {
  success: false,
  error: {
    code: ExchangeRateCode.INVALID_ACCESS_KEY,
    type: ExchangeRateErrorType.INVALID_ACCESS_KEY,
    info: DEFAULT_INFO_MESSAGES.UNAUTHORIZED,
  },
};

export const MISSING_PARAMETER_RESPONSE: ExchangeRateAPIResponse = {
  success: false,
  error: {
    code: ExchangeRateCode.MISSING_ACCESS_KEY,
    type: ExchangeRateErrorType.MISSING_ACCESS_KEY,
    info: DEFAULT_INFO_MESSAGES.MISSING_PARAMETER,
  },
};