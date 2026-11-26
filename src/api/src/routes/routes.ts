import express, {type Express} from "express";
import {catchAll} from "../middleware/ErrorHandling.js";
import health from "../middleware/Health.js";
import ServiceContainerImpl
  from "../services/ServiceContainer/ServiceContainerImpl.js";
import v1Routes from "./v1.js";
import v2Routes from "./v2.js";

const routes: Express = express();
const serviceContainer = new ServiceContainerImpl();

routes.locals.environmentService = serviceContainer.environmentService;
routes.locals.firestoreService = serviceContainer.firestoreService;
routes.locals.exchangeRatesService = serviceContainer.exchangeRatesService;

routes.use("/v1", v1Routes);
routes.use("/v2", v2Routes);
routes.get("/health", health);
routes.use(catchAll);

export default routes;
