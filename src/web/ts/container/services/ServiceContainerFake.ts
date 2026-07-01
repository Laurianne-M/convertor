import type { ServiceContainer } from "./ServiceContainer";
import { LoggerServiceFake } from "../../services/Logger/LoggerServiceFake";
import { ExchangeRateServiceFake, TEST_EXCHANGE_RATES_FAKE_OVERRIDES } from "../../services/ExchangeRate/ExchangeRateServiceFake";
import { StorageServiceFake } from "../../services/Storage/StorageServiceFake";
import { TimeProviderServiceFake } from "../../services/TimeProvider/TimeProviderServiceFake";

/**
 * Fake implementation of ServiceContainer, used in tests.
*/
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
      TEST_EXCHANGE_RATES_FAKE_OVERRIDES,
      this.timeProvider
    );
  }
}