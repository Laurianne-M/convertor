/**
 * The environment service implementation.
 */
export default class EnvironmentServiceImpl {

  getExchangeRatesURL(): string {
    let API_KEY = process.env.VITE_EXCHANGE_RATES_API_KEY;
    let BASE_URL = "https://api.exchangeratesapi.io/v1/latest";
    
    return `${BASE_URL}?access_key=${API_KEY}`;
  }
}