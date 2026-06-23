import type { TimeProviderServiceImpl } from "../../services/TimeProvider/TImeProviderServiceImp";
import type { LoggerServiceImpl } from "../../services/Logger/LoggerServiceImpl";
import type { StorageServiceImpl } from "../../services/Storage/StorageServiceImpl";
import type { ExchangeRateServiceImp } from "../../services/ExchangeRate/ExchangeRateServiceImp";

export interface ServiceContainer {
  timeProvider: TimeProviderServiceImpl;
  logger: LoggerServiceImpl;
  storage: StorageServiceImpl;
  exchangeRateService: ExchangeRateServiceImp;
}