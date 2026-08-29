import {Router, type Response, type Request, NextFunction} from "express";
import {catchAll} from "../middleware/ErrorHandling.js";
import { getExchangeRates } from "../services/ExchangeRates/ExchangeRatesServiceImpl.js";

/**
 * Creates an Express Router configured to proxy v1 exchange rate API endpoints.
 * 
 * @param {Function} [fetchFn] - Optional fetch implementation,
 * defaults to global `fetch`. Used for dependency injection in tests.
 * @return {Router} Configured Express instance.
 */
export function createV1Router(fetchFn: typeof fetch) {
  // eslint-disable-next-line new-cap
  const router = Router();

  /**
   * GET /v1/latest
   * Fetches the latest exchange rates from the upstream API provider
   * Forwards the exact status code and body.
   */
  router.get("/latest", (_: Request, res: Response, next: NextFunction) => {
    getExchangeRates(fetchFn).then(result => {
      const { data, response } = result;
      res.status(response.status).json(data);
    })
    .catch(next);
  });

  router.use(catchAll);
  return router;
}