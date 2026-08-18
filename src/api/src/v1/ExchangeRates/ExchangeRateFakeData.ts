import {ExchangeRateAPIResponse} from "./ExchangeRates.js";
import {APIConstants} from "../../constants.js";

export const SUPPORTED_CURRENCY_CODES = [
  // Major Global
  "USD", "EUR", "GBP", "JPY", "CHF", "CAD", "AUD", "NZD",
  // Asia
  "CNY", "HKD", "SGD", "KRW", "INR", "THB", "MYR", "IDR", "PHP",
  // Europe (Non-Euro)
  "SEK", "NOK", "DKK", "PLN", "CZK", "HUF",
  // Americas
  "MXN", "BRL", "ARS", "CLP", "COP",
  // Middle East & Africa
  "AED", "SAR", "ZAR", "ILS", "TRY"
] as const;

/**
 * Generates deterministic rates for active currencies without hardcoding
 */
const generateRates = (): Record<string, number> => {
  return SUPPORTED_CURRENCY_CODES.reduce((accumulator, code, index) => {
    if (code === APIConstants.currencies.EUR.code) {
      accumulator[code] = 1.0;
    } else {
      const seed = code.charCodeAt(0) + code.charCodeAt(1) + code.charCodeAt(2);
      accumulator[code] = Number(((seed / 100) + (index * 0.05)).toFixed(4));
    }
    return accumulator;
  }, {} as Record<string, number>);
};

export const createExchangeRateResponse = (
  overrides?: Partial<ExchangeRateAPIResponse>
): ExchangeRateAPIResponse => {
  return {
    success: true,
    timestamp: 1787011200000,
    date: "2026-08-18",
    base: APIConstants.currencies.EUR.code,
    rates: generateRates(),
    ...overrides
  };
};