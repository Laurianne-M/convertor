import {type Response, type Request, NextFunction} from "express";

/**
 * Middleware proxy for fetching exchange rates.
 * Retrieves the latest exchange rates from the exchange rates service
 * and returns the data in the response.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The NextFunction to propagate errors.
 */
const exchangeRateProxy = (req: Request, res: Response, next: NextFunction) => {
  req.app.locals.exchangeRatesService.getExchangeRates().then((result) => {
    const {data, response} = result;
    res.status(response.status).json(data);
  })
    .catch(next);
};

export default exchangeRateProxy;
