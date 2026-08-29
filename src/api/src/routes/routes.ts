import express, {type Express} from "express";
import ExchangeRatesServiceImpl from "../services/ExchangeRates/ExchangeRatesServiceImpl.js";
import v1 from "./v1.js";
import {catchAll} from "../middleware/ErrorHandling.js";
import health from "./health.js";
import EnvironmentServiceImpl from "../services/Environment/EnvironmentServiceImpl.js";

const routes: Express = express();

const environmentService = new EnvironmentServiceImpl();
routes.locals.environmentService = environmentService;
routes.locals.exchangeRatesService = new ExchangeRatesServiceImpl({
  fetch,
  environmentService
});

routes.use("/v1", v1);
routes.get("/health", health);
routes.use(catchAll);

export default routes;