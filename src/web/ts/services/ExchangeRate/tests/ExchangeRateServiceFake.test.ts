import { describe, vi, it, beforeEach, afterEach, expect } from "vitest";
import { ExchangeRate } from "../ExchangeRateFallbackData";
import { ExchangeRateServiceFake } from "../ExchangeRateServiceFake";
import { TimeProviderServiceFake } from "../../TimeProvider/TimeProviderServiceFake";


const fakeTimeProvider = new TimeProviderServiceFake()
let exchangeRatesFake = new ExchangeRateServiceFake(
  {
    rates: {
      USD: 1.09,
      EUR: 1,
      GBP: 0.86,
      JPY: 162.4,
      CAD: 1.48,
      AUD: 1.66,
      BTC: 0.000015,
      XAU: 0.00047,
      XAG: 0.038
    },
    base: 'EUR',
  },
  fakeTimeProvider
);

beforeEach(() => {
  exchangeRatesFake.loadRatesCallCount = 0;
  vi.clearAllMocks();
})

describe('ExchangeRateServiceFake', () => {
  it('should return the rates when loadRates called', async () => {
    const result = await exchangeRatesFake.loadRates()

    expect(result).toEqual({
      rates: {
        USD: 1.09,
        EUR: 1,
        GBP: 0.86,
        JPY: 162.4,
        CAD: 1.48,
        AUD: 1.66,
        BTC: 0.000015,
        XAU: 0.00047,
        XAG: 0.038
      },
      base: 'EUR'
    })
  })

  it('should increment loadRatesCallCount on each call ', async () => {
    await exchangeRatesFake.loadRates();
    await exchangeRatesFake.loadRates();

    expect(exchangeRatesFake.loadRatesCallCount).toBe(2);

  })

})
