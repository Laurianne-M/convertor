// @vitest-environment jsdom
/// <reference types="vitest/globals" />
import { describe, vi, it, beforeEach, afterEach, expect } from "vitest";
import { JSDOM } from 'jsdom';
import { ExchangeRateServiceImp as ExchangeRateServiceImpl } from "../ExchangeRateServiceImp";
import { ExchangeRate } from "../ExchangeRateFallbackData";
import { StorageServiceFake } from "../../Storage/StorageServiceFake";
import { LoggerServiceFake } from "../../Logger/LoggerServiceFake";
import { FakeFetch, FakeErrorFetch } from "../FakeFetch";
import { TimeProviderServiceFake } from "../../TimeProvider/TimeProviderServiceFake";

const dom = new JSDOM('', { url: 'http://localhost' });
global.localStorage = dom.window.localStorage;

const fakeTimeProvider = new TimeProviderServiceFake(new Date('2026-03-24'))
let fakeFetch: FakeFetch;

const limitFetch = new FakeFetch({
  error: true,
  message: 'monthly limit reached'
})

const errorFetch = new FakeErrorFetch();


const localStorage = new StorageServiceFake();
const fakeLogger = new LoggerServiceFake();

describe('exchangeRateService', () => {
  let exchangeRateService: ExchangeRateServiceImpl;

  beforeEach(() => {
    fakeFetch = new FakeFetch({
      success: true,
      timestamp: fakeTimeProvider.currentDate().getTime(),
      date: fakeTimeProvider.currentDate().toISOString().split('T')[0] ?? '',
      base: 'EUR',
      rates: { USD: 1.6, CAD: 1.9 }
    });

    exchangeRateService = new ExchangeRateServiceImpl({
      fetch: fakeFetch.fetch,
      timeProvider: fakeTimeProvider,
      storage: localStorage,
      logger: fakeLogger,
    });
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should cached data from localStorage without fetching again", async () => {
    await exchangeRateService.loadRates();

    await exchangeRateService.loadRates();

    expect(fakeFetch.callCount).toBe(1);
  });

  it("should fetch and caching new data if they are outdated", async () => {

    const mockedData = {
      jsonData: {
        rates: { CAD: 1.4, USD: 1.5 },
        base: "EUR"
      },
      receivedAt: new Date('2026-03-20')
    };

    localStorage.set("data", mockedData);

    await exchangeRateService.loadRates();

    expect(fakeFetch.callCount).toBe(1);
  });

  it('should return the data if data exist and are not outdated', async () => {

    const mockedData = {
      jsonData: {
        rates: { CAD: 1.9, USD: 1.6 },
        base: "EUR" 
      },
        receivedAt: new Date('2026-03-24')
    };

    localStorage.set("data", mockedData);

    const result = await exchangeRateService.loadRates();
    const localStorageData = { rates: { CAD: 1.9, USD: 1.6 }, base: "EUR" };

    expect(result).toEqual(expect.objectContaining(localStorageData));
  });

  it('should fetch new data if data do not exist or are outdaded', async () => {
  fakeFetch = new FakeFetch({
    success: true,
    timestamp: fakeTimeProvider.currentDate().getTime(),
    date: fakeTimeProvider.currentDate().toISOString().split('T')[0] ?? '',
    base: 'EUR',
    rates: { CAD: 1.4, USD: 1.5 }
  });

  exchangeRateService = new ExchangeRateServiceImpl({
    fetch: fakeFetch.fetch,
    timeProvider: fakeTimeProvider,
    storage: localStorage,
    logger: fakeLogger,
  });

  const result = await exchangeRateService.loadRates();

  expect(result).toEqual(expect.objectContaining({ 
    rates: { CAD: 1.4, USD: 1.5 }, 
    base: "EUR" 
  }));
  });

  it('returns fallback data on api quota limit', async () => {
    // Given: An ExchangeRateService that has reached its API quota
    exchangeRateService = new ExchangeRateServiceImpl({
      fetch: limitFetch.fetch,
      timeProvider: fakeTimeProvider,
      storage: localStorage,
      logger: fakeLogger
    })

    // When: The user loads the exchange rates
    const response = await exchangeRateService.loadRates()

    const fallback = ExchangeRate.fallbackData(fakeTimeProvider);

    // Then: The fallback data is used
    expect(response.base).toEqual(fallback.base)
    expect(response.rates).toEqual(fallback.rates)
  });

  it('should return mocked Data if fetch fail (network error)', async () => {
    exchangeRateService = new ExchangeRateServiceImpl({
      fetch: errorFetch.fetch,
      timeProvider: fakeTimeProvider,
      storage: localStorage,
      logger: fakeLogger
    });

    const response = await exchangeRateService.loadRates();

    const fallback = ExchangeRate.fallbackData(fakeTimeProvider);

    expect(response.base).toEqual(fallback.base);
    expect(response.rates).toEqual(fallback.rates);
  });
});