/**
 * Represents exchange rate data relative to a single base currency.
 */

export interface ExchangeRates {
  /**
   * Base currency code against which all exchange rates are calculated.
   */
  base: string;

  /**
   * Currency codes mapping with their exchange rate relative to base currency.
   */
  rates: Record<string, number>;
}
