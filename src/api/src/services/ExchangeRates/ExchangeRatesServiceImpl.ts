import ExchangeRatesService from "./ExchangeRatesService.js";
import EnvironmentService from "../Environment/EnvironmentService.js";

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
   * @param dependencies - The dependencies required to initialize the service.
   */
  constructor(dependencies: ExchangeRatesServiceImplDependencies) {
    this.dependencies = dependencies;
  }

  async getExchangeRates(): Promise<{ data: any; response: Response }> {
    const response = await this.dependencies.fetch(
      this.dependencies.environmentService.getExchangeRatesURL()
    );
    const data = await response.json();

    return { data, response };
  }
}
