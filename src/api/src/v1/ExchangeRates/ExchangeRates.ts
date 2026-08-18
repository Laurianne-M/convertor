export interface ExchangeRates {
  base: string;
  rates: Record<string, number>;
}

export interface ExchangeRateAPIResponse extends ExchangeRates {
  success: boolean;
  timestamp: number;
  date: string;
  error?: {
    code: number;
    type: string;
    info?: string;
  };
}