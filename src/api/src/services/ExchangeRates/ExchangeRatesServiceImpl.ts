import ExchangeRatesService, {
  EXCHANGE_RATES_COLLECTION,
} from "./ExchangeRatesService.js";
import EnvironmentService from "../Environment/EnvironmentService.js";
import {ExchangeRateAPIResponse}
  from "../../models/ExchangeRateAPIResponse.js";
import FirestoreService from "../Firestore/FirestoreService.js";

/**
 * Dependencies for the ExchangeRatesServiceImpl.
 */
export interface ExchangeRatesServiceImplDependencies {

  /**
   * The fetch function to use for making HTTP requests.
   */
  fetch: typeof fetch,

  /**
   * The environment service to use for getting the exchange rates URL.
   */
  environmentService: EnvironmentService,

  /** The Firestore service used to persist exchange rates. */
  firestoreService: FirestoreService,
}

/**
 * Implements the ExchangeRatesService interface.
 */
export default class ExchangeRatesServiceImpl implements ExchangeRatesService {
  /**
   * The dependencies required to initialize the service.
   */
  private dependencies: ExchangeRatesServiceImplDependencies;

  /**
   * Constructs an instance of ExchangeRatesServiceImpl.
   * @param {ExchangeRatesServiceImplDependencies} dependencies
   * The dependencies required to initialize the service.
   */
  constructor(dependencies: ExchangeRatesServiceImplDependencies) {
    this.dependencies = dependencies;
  }

  /**
   * Fetches exchange rates from the configured environment service endpoint.
   * @return {Promise<{data: any, response: Response}>} The exchange rates data
   * and raw fetch response.
   */
  async getExchangeRates(): Promise<{
    data: ExchangeRateAPIResponse;
    response: Response;
  }> {
    const response = await this.dependencies.fetch(
      this.dependencies.environmentService.getExchangeRatesURL()
    );
    const data = await response.json();

    return {data, response};
  }

  /** @inheritdoc */
  async fetchAndStoreExchangeRates(): Promise<ExchangeRateAPIResponse> {
    const {data, response} = await this.getExchangeRates();
    if (!response.ok || !data.success) {
      throw new Error("Could not fetch exchange rates successfully");
    }

    await this.dependencies.firestoreService.create(
      EXCHANGE_RATES_COLLECTION,
      data,
      data.date
    );
    return data;
  }
}
