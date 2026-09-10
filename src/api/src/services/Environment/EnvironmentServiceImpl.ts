import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

/**
 * The environment service implementation.
 */
export default class EnvironmentServiceImpl {
  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const envPath = path.resolve(__dirname, "../../../../../.env");
    dotenv.config({ path: envPath });
  }

  getExchangeRatesURL(): string {
    let API_KEY = process.env.EXCHANGE_RATES_API_KEY;
    let BASE_URL = "https://api.exchangeratesapi.io/v1/latest";
    
    return `${BASE_URL}?access_key=${API_KEY}`;
  }
}