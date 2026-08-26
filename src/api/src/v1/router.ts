import {Router, type Response, type Request} from "express";
import {
  ExchangeRateCode,
  ExchangeRateErrorType,
  DefaultInfoMessages,
} from "./router.constants.js";

/**
 * Creates an Express Router configured to proxy v1 exchange rate API endpoints.
 * @param {Function} [fetchFn] - Optional fetch implementation,
 * defaults to global `fetch`. Used for dependency injection in tests.
 * @return {Router} Configured Express instance.
 */
export function createV1Router(fetchFn: typeof fetch = fetch) {
  // eslint-disable-next-line new-cap
  const router = Router();

  /**
   * GET /v1/latest
   * Fetches the latest exchange rates from the upstream API provider
   * Forwards the exact status code and body.
   */
  router.get("/latest", async (req: Request, res: Response) => {
    try {
      const API_KEY = process.env.VITE_EXCHANGE_RATES_API_KEY;
      const BASE_URL = `https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;

      const response = await fetchFn(BASE_URL);
      const data = await response.json();

      return res.status(response.status).json(data);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: {
          code: ExchangeRateCode.INTERNAL_SERVER_ERROR,
          type: ExchangeRateErrorType.INTERNAL_SERVER_ERROR,
          info: DefaultInfoMessages.INTERNAL_SERVER_ERROR,
        },
      });
    }
  });

  return router;
}

export default createV1Router();
