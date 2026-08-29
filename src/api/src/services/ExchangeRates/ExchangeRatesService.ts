/**
 * The exchange rates service interface.
 */
export default interface ExchangeRatesService {

  /**
   * Returns the exchange rates.
   * @returns A promise that resolves to an object containing the exchange rates
   * data and the HTTP response.
   */
  getExchangeRates(): Promise<{ data: any; response: Response }>;
}