import type { TimeProvider } from "../../services/TimeProvider/TimeProviderService";
import type { LoggerService } from "../../services/Logger/LoggerService";
import type { StorageService } from "../../services/Storage/StorageService";
import type { ExchangeRateService } from "../../services/ExchangeRate/ExchangeRateService";

export interface ServiceContainer {
  timeProvider: TimeProvider;
  logger: LoggerService;
  storage: StorageService;
  exchangeRateService: ExchangeRateService;
}