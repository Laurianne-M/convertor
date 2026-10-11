import type { ServiceContainer } from "./ServiceContainer";
import { TimeProviderServiceImpl } from "../../services/TimeProvider/TImeProviderServiceImp";
import { LoggerServiceImpl } from "../../services/Logger/LoggerServiceImpl";
import { StorageServiceImpl } from "../../services/Storage/StorageServiceImpl";
import { ExchangeRateServiceImp } from "../../services/ExchangeRate/ExchangeRateServiceImp";
import { DOMServiceImpl } from "../../services/DOM/DOMServiceImpl";

export class ServiceContainerImpl implements ServiceContainer {
  public readonly timeProvider: TimeProviderServiceImpl;
  public readonly logger: LoggerServiceImpl;
  public readonly storage: StorageServiceImpl;
  public readonly exchangeRateService: ExchangeRateServiceImp;
  public readonly dom: DOMServiceImpl;

  constructor() {
    this.timeProvider = new TimeProviderServiceImpl;
    this.logger = new LoggerServiceImpl;
    this.storage = new StorageServiceImpl(this.logger);
    this.exchangeRateService = new ExchangeRateServiceImp({
      fetch,
      timeProvider: this.timeProvider,
      storage: this.storage,
      logger: this.logger
    });
    this.dom = new DOMServiceImpl;
  }
}