import dotenv from "dotenv";
import path from "path";
import {fileURLToPath} from "url";

/**
 * The environment service implementation.
 */
export default class EnvironmentServiceImpl {
  /**
   * Initializes the environment service and loads variables from the .env file.
   */
  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const envPath = path.resolve(__dirname, "../../../../../.env");
    dotenv.config({path: envPath});
  }

  /**
   * Returns the URL for the exchange rates service.
   * @return {string} The URL for the exchange rates service including API key.
   */
  getExchangeRatesURL(): string {
    const API_KEY = process.env.EXCHANGE_RATES_API_KEY;
    const BASE_URL = "https://api.exchangeratesapi.io/v1/latest";

    return `${BASE_URL}?access_key=${API_KEY}`;
  }
}
