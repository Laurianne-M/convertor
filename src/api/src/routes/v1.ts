import express, {type Router} from "express";
import exchangeRateProxy from "../middleware/ExchangeRateProxy.js";

const createRouter = express.Router;
const v1Routes: Router = createRouter();

v1Routes.get("/latest", exchangeRateProxy);

export default v1Routes;
