import { describe, it, beforeEach, expect } from "vitest";
import { ExchangeRateServiceFake, type ExchangeRateServiceFakeOverrides } from "../ExchangeRateServiceFake";
import { TimeProviderServiceFake } from "../../TimeProvider/TimeProviderServiceFake";

const overrides: ExchangeRateServiceFakeOverrides = {
  rates: {
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
  }
}

describe('ExchangeRateServiceFake', () => {
  let fakeTimeProvider: TimeProviderServiceFake
  let exchangeRatesFake: ExchangeRateServiceFake

  beforeEach(() => {
    fakeTimeProvider = new TimeProviderServiceFake(new Date('2026-03-12T00:00:00Z'))
    exchangeRatesFake = new ExchangeRateServiceFake(
      overrides,
      fakeTimeProvider
    );
  })

  describe('ExchangeRateServiceFake', () => {
    it('should return the rates when loadRates called', async () => {
      const result = await exchangeRatesFake.loadRates()
      expect(result).toEqual(overrides.rates)
    })

    it('throws an error when an error is specified in overrides', () => {
      const expectedError = new Error("404 not found")
      exchangeRatesFake.overrides.error = expectedError
      expect(exchangeRatesFake.loadRates()).rejects.toThrow(expectedError)
    })
  })
})