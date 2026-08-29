export default interface ExchangeRatesService {
  getExchangeRates(): Promise<{ data: any; response: Response }>;
}