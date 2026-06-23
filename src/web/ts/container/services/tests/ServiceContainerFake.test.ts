import { ServiceContainerFake } from "../ServiceContainerFake";
import { it,describe, expect} from "vitest";

const container = new ServiceContainerFake();

describe('ServiceContainerFake', () => {
  it('should provide a working logger', () => {
    container.logger.info('test message');
    expect(container.logger.logs).toEqual([
      { level: 'info', value: 'test message' }
    ]);
  });
});

  it('should provide a working storage', () => {
    container.storage.set('data', 'mockData');

    expect(container.storage.get('data')).toBe('mockData');
  });

  it('should provide a working time provider', () => {
    const result = container.timeProvider.currentDate();

    expect(result).toBeInstanceOf(Date);
  });

  it('should provide a working exchangeRates via loadRates', async () => {
    const result = await container.exchangeRateService.loadRates();
    expect(result.base).toBe('EUR');
    expect(result.rates.USD).toBe(1.1);
  })