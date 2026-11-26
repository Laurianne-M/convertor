import express, {type Router} from "express";
import dailyExchangeRates from "../middleware/DailyExchangeRates.js";
import historicalExchangeRates
  from "../middleware/HistoricalExchangeRates.js";

const createRouter = express.Router;
const v2Routes: Router = createRouter();

v2Routes.get("/daily/:date", dailyExchangeRates);
v2Routes.get("/daily", dailyExchangeRates);
v2Routes.get("/latest", dailyExchangeRates);
v2Routes.get("/historical", historicalExchangeRates);

export default v2Routes;
