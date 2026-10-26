import express, {type Express} from "express";
import ExchangeRatesServiceImpl
  from "../services/ExchangeRates/ExchangeRatesServiceImpl.js";
import {catchAll} from "../middleware/ErrorHandling.js";
import health from "../middleware/Health.js";
import exchangeRateProxy from "../middleware/ExchangeRateProxy.js";
import EnvironmentServiceImpl
  from "../services/Environment/EnvironmentServiceImpl.js";
import {getApp, getApps, initializeApp}
  from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import FirestoreServiceImpl
  from "../services/Firestore/FirestoreServiceImpl.js";
import dailyExchangeRates from "../middleware/DailyExchangeRates.js";

const routes: Express = express();
const environmentService = new EnvironmentServiceImpl();
const firebaseApp = getApps().some((app) => app.name === "[DEFAULT]") ?
  getApp() : initializeApp({
    projectId: process.env.GCLOUD_PROJECT ?? "convertor-2b5dd",
  });
const firestoreService = new FirestoreServiceImpl(getFirestore(firebaseApp));

routes.locals.environmentService = environmentService;
routes.locals.firestoreService = firestoreService;
routes.locals.exchangeRatesService = new ExchangeRatesServiceImpl({
  fetch,
  environmentService,
  firestoreService,
});

routes.get("/v1/latest", exchangeRateProxy);
routes.get("/v2/daily/:date", dailyExchangeRates);
routes.get("/v2/daily", dailyExchangeRates);
routes.get("/v2/latest", dailyExchangeRates);
routes.get("/health", health);
routes.use(catchAll);

export default routes;
