// @vitest-environment jsdom
/// <reference types="vitest/globals" />
import { describe, vi, it, beforeEach, afterEach, expect } from "vitest";
import { JSDOM } from 'jsdom';
import { ExchangeRateServiceImp as ExchangeRateServiceImpl } from "../ExchangeRateServiceImp";
import { ExchangeRate } from "../ExchangeRateFallbackData";

const dom = new JSDOM('', { url: 'http://localhost' });
global.localStorage = dom.window.localStorage;

const fakeTimeProvider = {
  currentDate: () => new Date('2026-03-24')
};

const fakeFetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ rates: { CAD: 1.4, USD: 1.5 }, base: "EUR" })
  })
);

const limitFetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ error: true, message: "monthly limit reached" })
  })
);

const errorFetch = vi.fn(() => Promise.reject(new Error('network failure')));

describe('exchangeRateService', () => {
  let exchangeRateService: ExchangeRateServiceImpl;

  beforeEach(() => {
    exchangeRateService = new ExchangeRateServiceImpl({
      fetch: fakeFetch,
      timeProvider: fakeTimeProvider,
      storage: localStorage
    });
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should cached data from localStorage without fetching again", async () => {
    await exchangeRateService.loadRates();

    await exchangeRateService.loadRates();

    expect(fakeFetch).toHaveBeenCalledTimes(1);
  });

  it("should fetch and caching new data if they are outdated", async () => {

    const mockedData = {
      jsonData: {
        rates: { CAD: 1.4, USD: 1.5 },
        base: "EUR"
      },
      receivedAt: new Date('2026-03-20')
    };

    localStorage.setItem("data", JSON.stringify(mockedData));

    await exchangeRateService.loadRates();

    expect(fakeFetch).toHaveBeenCalledTimes(1);
  });

  it('should return the data if data exist and are not outdated', async () => {

    const mockedData = {
      jsonData: {
        rates: { CAD: 1.9, USD: 1.6 },
        base: "EUR" 
      },
        receivedAt: new Date('2026-03-24')
    };

    localStorage.setItem("data", JSON.stringify(mockedData));

    const result = await exchangeRateService.loadRates();
    const localStorageData = { rates: { CAD: 1.9, USD: 1.6 }, base: "EUR" };

    expect(result).toEqual(expect.objectContaining(localStorageData));
  });

  it('should fetch new data if data do not exist or are outdaded', async () => {
    const result = await exchangeRateService.loadRates();

    const newData = { rates: { CAD: 1.4, USD: 1.5 }, base: "EUR" };

    expect(result).toEqual(expect.objectContaining(newData));
  });

  it('returns fallback data on api quota limit', async () => {
    // Given: An ExchangeRateService that has reached its API quota
    exchangeRateService = new ExchangeRateServiceImpl({
      fetch: limitFetch,
      timeProvider: fakeTimeProvider,
      storage: localStorage
    })

    // When: The user loads the exchange rates
    const response = await exchangeRateService.loadRates()

    // Then: The fallback data is used
    expect(response.base).toEqual(ExchangeRate.fallbackData.base)
    expect(response.rates).toEqual(ExchangeRate.fallbackData.rates)
  });

  it('should return mocked Data if fetch fail (network error)', async () => {
    exchangeRateService = new ExchangeRateServiceImpl({
      fetch: errorFetch,
      timeProvider: fakeTimeProvider,
      storage: localStorage
    });

    const response = await exchangeRateService.loadRates();

    expect(response.base).toEqual(ExchangeRate.fallbackData.base);
    expect(response.rates).toEqual(ExchangeRate.fallbackData.rates);
  });
});