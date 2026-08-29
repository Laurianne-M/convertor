import {Router, type Response, type Request, NextFunction} from "express";

const v1 = Router();

v1.get("/latest", (req: Request, res: Response, next: NextFunction) => {
  req.app.locals.exchangeRatesService.getExchangeRates().then(result => {
    const { data, response } = result;
    res.status(response.status).json(data);
  })
  .catch(next);
});

export default v1;