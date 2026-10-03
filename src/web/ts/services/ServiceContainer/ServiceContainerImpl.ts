import type { ServiceContainer } from "./ServiceContainer";
import { TimeProviderServiceImpl } from "../../services/TimeProvider/TImeProviderServiceImp";
import { LoggerServiceImpl } from "../../services/Logger/LoggerServiceImpl";
import { StorageServiceImpl } from "../../services/Storage/StorageServiceImpl";
import { ExchangeRateServiceImp } from "../../services/ExchangeRate/ExchangeRateServiceImp";
import { DOMServiceImpl } from "../../services/DOM/DOMServiceImpl";
import { EnvironmentServiceImpl } from "../Environment/EnvironmentServiceImpl";

export class ServiceContainerImpl implements ServiceContainer {
  public readonly timeProvider: TimeProviderServiceImpl;
  public readonly logger: LoggerServiceImpl;
  public readonly storage: StorageServiceImpl;
  public readonly exchangeRateService: ExchangeRateServiceImp;
  public readonly dom: DOMServiceImpl;
  public readonly environment: EnvironmentServiceImpl;

  constructor() {
    this.timeProvider = new TimeProviderServiceImpl;
    this.logger = new LoggerServiceImpl;
    this.storage = new StorageServiceImpl(this.logger);
    this.environment = new EnvironmentServiceImpl({ logger: this.logger });
    this.exchangeRateService = new ExchangeRateServiceImp({
      fetch,
      timeProvider: this.timeProvider,
      storage: this.storage,
      logger: this.logger,
      environmentService: this.environment,
    });
    this.dom = new DOMServiceImpl;
  }
}