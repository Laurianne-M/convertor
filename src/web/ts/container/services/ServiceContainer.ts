import type { TimeProvider } from "../../services/TimeProvider/TimeProviderService";
import type { LoggerService } from "../../services/Logger/LoggerService";
import type { StorageService } from "../../services/Storage/StorageService";
import type { ExchangeRateService } from "../../services/ExchangeRate/ExchangeRateService";

/**
 * Centralizes the creation and wiring of all services used by the application.
 * Implementations of this interface are responsible for constructing each
 * service with its required dependencies, so users don't need to know
 * how services are built or wired together.
 */

export interface ServiceContainer {
/**Provides access to the current date/time, used for caching and date comparison*/
  timeProvider: TimeProvider;

/**Logs debug, info, warning and errors message*/
  logger: LoggerService;

/**Reads and stores data, such as cached exchange rates*/
  storage: StorageService;

/** Fetches and caches currency exchange rates*/
  exchangeRateService: ExchangeRateService;
}