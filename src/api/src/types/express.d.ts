import EnvironmentService from "../services/Environment/EnvironmentService.ts";
import ExchangeRatesService from "../services/ExchangeRates/ExchangeRatesService.ts";

declare global {
  namespace Express {
    interface Locals {

      /**
       * The exchange rates service.
       */
      exchangeRatesService: ExchangeRatesService;

      /**
       * The environment service.
       */
      environmentService: EnvironmentService;
    }
  }
}