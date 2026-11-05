// @vitest-environment jsdom
/// <reference types="vitest/globals" />
import { describe, test, beforeEach, expect } from "vitest";
import { ExchangeRateServiceImp as ExchangeRateServiceImpl } from "../ExchangeRateServiceImp";
import { fallbackData } from "../ExchangeRateFallbackData";
import { StorageServiceFake } from "../../Storage/StorageServiceFake";
import { LoggerServiceFake } from "../../Logger/LoggerServiceFake";
import { FakeFetch, FakeErrorFetch } from "../FakeFetch";
import { TimeProviderServiceFake } from "../../TimeProvider/TimeProviderServiceFake";
import { config } from "../../../config/env";

describe("ExchangeRateServiceImp", () => {
  let fakeTimeProvider: TimeProviderServiceFake;
  let storageFake: StorageServiceFake;
  let loggerFake: LoggerServiceFake;

  beforeEach(() => {
    fakeTimeProvider = new TimeProviderServiceFake({
      currentDate: new Date("2026-03-24T12:00:00.000Z"),
    });
    storageFake = new StorageServiceFake();
    loggerFake = new LoggerServiceFake();
    storageFake.clear();
  });

  test("should return data from storage if present and fresh without calling fetch", async () => {
    const freshData = {
      jsonData: {
        success: true,
        base: "EUR",
        rates: { CAD: 1.9, USD: 1.6 },
        timestamp: 1774353600,
        date: "2026-03-24",
      },
      receivedAt: "2026-03-24T10:00:00.000Z",
    };

    await storageFake.set("data", freshData);

    const fakeFetch = new FakeFetch({
      success: true,
      base: "EUR",
      rates: { CAD: 1.9, USD: 1.6 },
    });

    const service = new ExchangeRateServiceImpl({
      fetch: fakeFetch.fetch,
      timeProvider: fakeTimeProvider,
      storage: storageFake,
      logger: loggerFake,
    });

    const result = await service.loadRates();

    expect(fakeFetch.callCount).toBe(0);
    expect(result).toEqual({
      rates: { CAD: 1.9, USD: 1.6 },
      base: "EUR",
    });
  });

  test("should fetch fresh exchange rates from API proxy when storage is empty", async () => {
    const apiResponse = {
      success: true,
      base: "EUR",
      rates: { CAD: 1.48, USD: 1.09 },
    };

    const fakeFetch = new FakeFetch(apiResponse);

    const service = new ExchangeRateServiceImpl({
      fetch: fakeFetch.fetch,
      timeProvider: fakeTimeProvider,
      storage: storageFake,
      logger: loggerFake,
    });

    const result = await service.loadRates();

    expect(fakeFetch.callCount).toBe(1);
    expect(fakeFetch.lastUrl).toBe(`${config.apiBaseUrl}/v1/latest`);
    expect(result).toEqual({
      rates: { CAD: 1.48, USD: 1.09 },
      base: "EUR",
    });

    const stored = await storageFake.get<{ jsonData: typeof apiResponse }>("data");
    expect(stored?.jsonData.rates).toEqual({ CAD: 1.48, USD: 1.09 });
  });

  test("should re-fetch from API proxy when cached data is outdated", async () => {
    fakeTimeProvider.overrides = {
      ...fakeTimeProvider.overrides,
      isOlderThan: true,
    };

    const outdatedData = {
      jsonData: {
        success: true,
        base: "EUR",
        rates: { CAD: 1.1, USD: 1.2 },
      },
      receivedAt: "2026-03-20T12:00:00.000Z",
    };

    await storageFake.set("data", outdatedData);

    const fakeFetch = new FakeFetch({
      success: true,
      base: "EUR",
      rates: { CAD: 1.48, USD: 1.09 },
    });

    const service = new ExchangeRateServiceImpl({
      fetch: fakeFetch.fetch,
      timeProvider: fakeTimeProvider,
      storage: storageFake,
      logger: loggerFake,
    });

    const result = await service.loadRates();

    expect(fakeFetch.callCount).toBe(1);
    expect(result).toEqual({
      rates: { CAD: 1.48, USD: 1.09 },
      base: "EUR",
    });
  });

  test("should return fallback rates when API endpoint returns 500 or error", async () => {
    const fakeFetch = new FakeFetch({
      success: false,
      error: "Server error",
    });

    const service = new ExchangeRateServiceImpl({
      fetch: fakeFetch.fetch,
      timeProvider: fakeTimeProvider,
      storage: storageFake,
      logger: loggerFake,
    });

    const result = await service.loadRates();
    const fallback = fallbackData(fakeTimeProvider);

    expect(result.base).toBe(fallback.base);
    expect(result.rates).toEqual(fallback.rates);
  });

  test("should return fallback rates when fetch throws a network exception", async () => {
    const errorFetch = new FakeErrorFetch();

    const service = new ExchangeRateServiceImpl({
      fetch: errorFetch.fetch,
      timeProvider: fakeTimeProvider,
      storage: storageFake,
      logger: loggerFake,
    });

    const result = await service.loadRates();
    const fallback = fallbackData(fakeTimeProvider);

    expect(result.base).toBe(fallback.base);
    expect(result.rates).toEqual(fallback.rates);

  });
});