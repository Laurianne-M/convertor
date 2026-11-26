import EnvironmentService from "../Environment/EnvironmentService.js";
import EnvironmentServiceImpl
  from "../Environment/EnvironmentServiceImpl.js";
import ExchangeRatesService from "../ExchangeRates/ExchangeRatesService.js";
import ExchangeRatesServiceImpl
  from "../ExchangeRates/ExchangeRatesServiceImpl.js";
import FirebaseAppServiceImpl
  from "../FirebaseApp/FirebaseAppServiceImpl.js";
import FirestoreCollection from "../Firestore/FirestoreCollection.js";
import FirestoreService from "../Firestore/FirestoreService.js";
import FirestoreServiceImpl from "../Firestore/FirestoreServiceImpl.js";
import {ExchangeRateSuccessResponse} from
  "../../models/ExchangeRateSuccessResponse.js";
import ServiceContainer from "./ServiceContainer.js";

/** Composes the real services used by the API routes. */
export default class ServiceContainerImpl implements ServiceContainer {
  readonly environmentService: EnvironmentService;
  readonly firestoreService: FirestoreService<ExchangeRateSuccessResponse>;
  readonly exchangeRatesService: ExchangeRatesService;

  /** Creates the real application services. */
  constructor() {
    this.environmentService = new EnvironmentServiceImpl();
    const firebaseApp = new FirebaseAppServiceImpl();
    this.firestoreService = new FirestoreServiceImpl<
      ExchangeRateSuccessResponse
    >(
      firebaseApp.firestore,
      FirestoreCollection.EXCHANGE_RATES
    );
    this.exchangeRatesService = new ExchangeRatesServiceImpl({
      fetch,
      environmentService: this.environmentService,
      firestoreService: this.firestoreService,
    });
  }
}
