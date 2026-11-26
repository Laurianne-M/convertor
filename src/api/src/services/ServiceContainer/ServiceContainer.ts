import EnvironmentService from "../Environment/EnvironmentService.js";
import ExchangeRatesService from "../ExchangeRates/ExchangeRatesService.js";
import FirestoreService from "../Firestore/FirestoreService.js";
import {ExchangeRateSuccessResponse} from
  "../../models/ExchangeRateSuccessResponse.js";

/** Services exposed to the API routes. */
interface ServiceContainer {
  readonly environmentService: EnvironmentService;
  readonly firestoreService: FirestoreService<ExchangeRateSuccessResponse>;
  readonly exchangeRatesService: ExchangeRatesService;
}

export default ServiceContainer;
