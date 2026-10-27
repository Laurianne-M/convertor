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
    console.debug("Fetching exchange rates from public API");
    const response = await this.dependencies.fetch(
      this.dependencies.environmentService.getExchangeRatesURL()
    );

    const stringifiedResponse = JSON.stringify(response, null, 2);
    console.debug(`Will desereialize HTTP response: \n${stringifiedResponse}`);
    const data = await response.json();
    const stringifiedData = JSON.stringify(data, null, 2);
    console.debug(`Deserialized JSON response: ${stringifiedData}`);

    // TODO - throw if (!response.ok || !data.success)
    return {data, response};
  }

  /** @inheritdoc */
  async fetchAndStoreExchangeRates(): Promise<ExchangeRateAPIResponse> {
    console.debug("Will fetch an storate exchange rates from public API");
    const {data, response} = await this.getExchangeRates();

    // TODO - Allow getExchangeRates() to throw so that we get this behavior
    // for all clients of getExchangeRates() instead of only performing status
    // checks for call paths to this function (/v2 only)
    if (!response.ok) {
      const message = `Non 2xx status code recieved: ${response.status}`;
      console.error(message);
      throw new Error(message);
    }

    if (!data.success) {
      const stringifiedData = JSON.stringify(data, null, 2);
      const message = `Public API indicated a failure: ${stringifiedData}`;
      console.error(message);
      throw new Error(message);
    }

    console.debug(`Storing data in collection: ${EXCHANGE_RATES_COLLECTION}`);

    await this.dependencies.firestoreService.create(
      EXCHANGE_RATES_COLLECTION,
      data,
      data.date
    );

    console.debug(`Stored data in collection: ${EXCHANGE_RATES_COLLECTION}`);
    return data;
  }
}
