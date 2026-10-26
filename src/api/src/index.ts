import {onRequest} from "firebase-functions/https";
import {onSchedule} from "firebase-functions/v2/scheduler";
import routes from "./routes/routes.js";

export const api = onRequest(routes);

export const fetchAndStoreExchangeRates = onSchedule({
  schedule: "every day 00:00",
  timeZone: "Etc/UTC",
}, async () => {
  await routes.locals.exchangeRatesService.fetchAndStoreExchangeRates();
});
