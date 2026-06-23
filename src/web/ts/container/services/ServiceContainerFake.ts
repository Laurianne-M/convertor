import type { ServiceContainer } from "./ServiceContainer";
import { LoggerServiceFake } from "../../services/Logger/LoggerServiceFake";
import { ExchangeRateServiceFake } from "../../services/ExchangeRate/ExchangeRateServiceFake";
import { StorageServiceFake } from "../../services/Storage/StorageServiceFake";
import { TimeProviderServiceFake } from "../../services/TimeProvider/TimeProviderServiceFake";

export class ServiceContainerFake implements ServiceContainer {
  public readonly timeProvider: TimeProviderServiceFake;
  public readonly logger: LoggerServiceFake;
  public readonly storage: StorageServiceFake;
  public readonly exchangeRateService: ExchangeRateServiceFake;

  constructor () {
    this.timeProvider = new TimeProviderServiceFake();
    this.logger = new LoggerServiceFake();
    this.storage = new StorageServiceFake();
    this.exchangeRateService = new ExchangeRateServiceFake(
      {
        rates: {
          rates: {
            USD: 1.1,
            EUR: 1.0,
            GBP: 0.85,
            JPY: 162.4,
            CAD: 1.48,
            AUD: 1.66,
            BTC: 0.015,
            XAU: 0.047,
            XAG: 0.038
            },
          base: 'EUR'
        }
      },
      this.timeProvider
    );
  }
}