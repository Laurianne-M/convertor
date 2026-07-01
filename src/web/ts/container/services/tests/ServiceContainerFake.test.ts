import { ExchangeRateServiceFake } from "../../../services/ExchangeRate/ExchangeRateServiceFake";
import { LoggerServiceFake } from "../../../services/Logger/LoggerServiceFake";
import { StorageServiceFake } from "../../../services/Storage/StorageServiceFake";
import { TimeProviderServiceFake } from "../../../services/TimeProvider/TimeProviderServiceFake";
import { ServiceContainerFake } from "../ServiceContainerFake";
import { it, describe, expect, beforeEach } from "vitest";

describe('ServiceContainerFake', () => {
  let container: ServiceContainerFake;

  beforeEach(() => {
    container = new ServiceContainerFake();
  })

  it('should provide a working logger', () => {
    expect(container.logger).toBeInstanceOf(LoggerServiceFake);
  });

  it('should provide a working storage', () => {
    expect(container.storage).toBeInstanceOf(StorageServiceFake);
  });

  it('should provide a working time provider', () => {
    expect(container.timeProvider).toBeInstanceOf(TimeProviderServiceFake);
  });

  it('should provide a working exchangeRates via loadRates', async () => {
    expect(container.exchangeRateService).toBeInstanceOf(ExchangeRateServiceFake);
  })
});