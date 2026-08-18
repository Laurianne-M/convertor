import type {ExchangeRateAPIResponse} from "./ExchangeRates.js";
import {APIConstants} from "../../constants.js";
import {createExchangeRateResponse} from "./ExchangeRateFakeData.js";

const DEFAULT_TIMESTAMP = 1787011200000;
const DEFAULT_DATE = "2026-08-18";

const responses = {
  success: createExchangeRateResponse(),

  internalError: {
    success: false,
    timestamp: DEFAULT_TIMESTAMP,
    date: DEFAULT_DATE,
    base: APIConstants.currencies.EUR.code,
    rates: {},
    error: APIConstants.ExchangeRateErrors.INTERNAL_ERROR
  } satisfies ExchangeRateAPIResponse,

  unauthorized: {
    success: false,
    timestamp: DEFAULT_TIMESTAMP,
    date: DEFAULT_DATE,
    base: APIConstants.currencies.EUR.code,
    rates: {},
    error: APIConstants.ExchangeRateErrors.INVALID_KEY
  } satisfies ExchangeRateAPIResponse,

  missingParameter: {
    success: false,
    timestamp: DEFAULT_TIMESTAMP,
    date: DEFAULT_DATE,
    base: APIConstants.currencies.EUR.code,
    rates: {},
    error: APIConstants.ExchangeRateErrors.MISSING_KEY
  } satisfies ExchangeRateAPIResponse
};

const fetchers = {
  success: (async () =>
    Response.json(responses.success, { status: 200 })) satisfies typeof fetch,

  internalError: (async () =>
    Response.json(responses.internalError, { status: 500 })) satisfies typeof fetch,

  unauthorized: (async () =>
    Response.json(responses.unauthorized, { status: 401 })) satisfies typeof fetch,

  missingParameter: (async () =>
    Response.json(responses.missingParameter, { status: 400 })) satisfies typeof fetch,
};

export const TestData = {
  responses,
  fetchers
};
