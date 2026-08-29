import express, {type Express} from "express";
import ExchangeRatesServiceImpl from "../services/ExchangeRates/ExchangeRatesServiceImpl.js";
import {catchAll} from "../middleware/ErrorHandling.js";
import health from "../middleware/Health.js";
import exchangeRateProxy from "../middleware/ExchangeRateProxy.js";
import EnvironmentServiceImpl from "../services/Environment/EnvironmentServiceImpl.js";

const routes: Express = express();
const environmentService = new EnvironmentServiceImpl();

routes.locals.environmentService = environmentService;
routes.locals.exchangeRatesService = new ExchangeRatesServiceImpl({
  fetch,
  environmentService
});

routes.get("/v1/latest", exchangeRateProxy);
routes.get("/health", health);
routes.use(catchAll);

export default routes;