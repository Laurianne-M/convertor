import { TimeProviderServiceImpl } from "../services/TimeProvider/TImeProviderServiceImp";
import { LoggerServiceImpl } from "../services/Logger/LoggerServiceImpl";
import { StorageServiceImpl } from "../services/Storage/StorageServiceImpl";
import { ExchangeRateServiceImp } from "../services/ExchangeRate/ExchangeRateServiceImp";

export class ServiceContainer {
  public readonly timeProvider: TimeProviderServiceImpl;
  public readonly logger: LoggerServiceImpl;
  public readonly storage: StorageServiceImpl;
  public readonly exchangeRateService: ExchangeRateServiceImp;

  constructor () {
    this.timeProvider = new TimeProviderServiceImpl;
    this.logger = new LoggerServiceImpl;
    this.storage = new StorageServiceImpl(this.logger);
    this.exchangeRateService = new ExchangeRateServiceImp({
    fetch, 
    timeProvider: this.timeProvider,
    storage: this.storage,
    logger: this.logger
  });
  }
}