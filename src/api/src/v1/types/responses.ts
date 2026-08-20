import { ExchangeRateCode, ExchangeRateErrorType } from "../router.constants.js";

export interface ExchangeRates {
  base: string;
  rates: Record<string, number>;
}

export interface ExchangeRateErrorDetail {
  code: ExchangeRateCode | number;
  type: ExchangeRateErrorType | string;
  info?: string;
}

// sub types 1 : Success Response
export interface ExchangeRateSuccessResponse extends ExchangeRates {
  success: true;
  timestamp: number;
  date: string;
}

// sub types 2 : Error Response

export interface ExchangeRateErrorResponse {
  success: false;
  error: ExchangeRateErrorDetail;
}

export type ExchangeRateAPIResponse =
  | ExchangeRateSuccessResponse
  | ExchangeRateErrorResponse;