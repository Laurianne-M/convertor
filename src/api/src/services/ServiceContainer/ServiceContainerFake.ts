import EnvironmentService from "../Environment/EnvironmentService.js";
import EnvironmentServiceFake from "../Environment/EnvironmentServiceFake.js";
import ExchangeRatesService from "../ExchangeRates/ExchangeRatesService.js";
import {ExchangeRatesServiceFake}
  from "../ExchangeRates/ExchangeRatesServiceFake.js";
import FirestoreService from "../Firestore/FirestoreService.js";
import FirestoreServiceFake from "../Firestore/FirestoreServiceFake.js";
import {ExchangeRateSuccessResponse} from
  "../../models/ExchangeRateSuccessResponse.js";
import ServiceContainer from "./ServiceContainer.js";

/** Composes fake services for API tests. */
export default class ServiceContainerFake implements ServiceContainer {
  readonly environmentService: EnvironmentService;
  readonly firestoreService: FirestoreService<ExchangeRateSuccessResponse>;
  readonly exchangeRatesService: ExchangeRatesService;

  /** Creates a container backed by in-memory fake services. */
  constructor() {
    this.environmentService = new EnvironmentServiceFake();
    this.firestoreService =
      new FirestoreServiceFake<ExchangeRateSuccessResponse>();
    this.exchangeRatesService = new ExchangeRatesServiceFake();
  }
}
