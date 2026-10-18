import {type NextFunction, type Request, type Response} from "express";
import {EXCHANGE_RATES_COLLECTION} from
  "../services/ExchangeRates/ExchangeRatesService.js";

/**
 * Returns exchange rates for the requested date, or the current UTC date.
 * @param {Request} req The Express request.
 * @param {Response} res The Express response.
 * @param {NextFunction} next The Express error handler.
 */
const dailyExchangeRates = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestedDate = req.params.date || req.query.date;
  const date = typeof requestedDate === "string" ? requestedDate :
    new Date().toISOString().slice(0, 10);

  req.app.locals.firestoreService
    .read(EXCHANGE_RATES_COLLECTION, date)
    .then((data: unknown) => {
      if (data === undefined) {
        res.status(404).json({
          success: false,
          error: `Exchange rates not found for ${date}`,
        });
        return;
      }

      res.json(data);
    })
    .catch(next);
};

export default dailyExchangeRates;
