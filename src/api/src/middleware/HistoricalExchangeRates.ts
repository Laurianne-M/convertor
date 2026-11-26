import {type NextFunction, type Request, type Response} from "express";
import {HTTPStatusCode} from "../models/HTTP.js";

const parseDate = (value: unknown): Date | undefined => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return undefined;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ||
    date.toISOString().slice(0, 10) !== value ? undefined : date;
};

/**
 * Parses and returns exchange rates for the requested historical date range.
 * @param {Request} req The Express request.
 * @param {Response} res The Express response.
 * @param {NextFunction} next The Express error handler.
 */
const historicalExchangeRates = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startDate = parseDate(req.query.startDate);
  const endDate = parseDate(req.query.endDate);

  if (!startDate || !endDate || startDate > endDate) {
    res.status(HTTPStatusCode.BAD_REQUEST).json({
      success: false,
      error: "startDate and endDate must be valid YYYY-MM-DD dates in order",
    });
    return;
  }

  req.app.locals.exchangeRatesService
    .getHistoricalExchangeRates({startDate, endDate})
    .then((data: unknown) => {
      res.status(HTTPStatusCode.SUCCESS).json(data);
    })
    .catch(next);
};

export default historicalExchangeRates;
