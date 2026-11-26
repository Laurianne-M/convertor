import {describe, expect, test, vi} from "vitest";
import {TestData} from "../../../models/testing/TestData.js";
import ExchangeRatesServiceImpl from "../ExchangeRatesServiceImpl.js";
import type {ExchangeRateSuccessResponse} from
  "../../../models/ExchangeRateSuccessResponse.js";
import type EnvironmentService from "../../Environment/EnvironmentService.js";
import type FirestoreService from "../../Firestore/FirestoreService.js";
import {HTTPStatusCode} from "../../../models/HTTP.js";

describe("ExchangeRatesServiceImpl", () => {
  test("fetches and stores successful rates under their date", async () => {
    const successData = TestData.responses.success as
      ExchangeRateSuccessResponse;
    const fetch = vi.fn().mockResolvedValue(
      Response.json(successData, {status: HTTPStatusCode.SUCCESS})
    );
    const create = vi.fn().mockResolvedValue(successData.date);
    const service = new ExchangeRatesServiceImpl({
      fetch,
      environmentService: {
        getExchangeRatesURL: () => "https://example.test/latest",
      } as EnvironmentService,
      firestoreService: {create} as unknown as
        FirestoreService<ExchangeRateSuccessResponse>,
    });

    await expect(service.fetchAndStoreExchangeRates())
      .resolves.toEqual(successData);

    expect(fetch).toHaveBeenCalledWith("https://example.test/latest");
    expect(create).toHaveBeenCalledWith(
      successData,
      successData.date
    );
  });

  test("does not store an unsuccessful exchange-rate response", async () => {
    const fetch = vi.fn().mockResolvedValue(
      Response.json(TestData.responses.unauthorized, {
        status: HTTPStatusCode.INVALID_ACCESS_KEY,
      })
    );
    const create = vi.fn();
    const service = new ExchangeRatesServiceImpl({
      fetch,
      environmentService: {
        getExchangeRatesURL: () => "https://example.test/latest",
      } as EnvironmentService,
      firestoreService: {create} as unknown as
        FirestoreService<ExchangeRateSuccessResponse>,
    });

    await expect(service.fetchAndStoreExchangeRates())
      .rejects.toThrow("Could not fetch exchange rates successfully");
    expect(create).not.toHaveBeenCalled();
  });

  test("queries historical rates using inclusive ISO date bounds", async () => {
    const readRange = vi.fn().mockResolvedValue([]);
    const service = new ExchangeRatesServiceImpl({
      fetch: vi.fn(),
      environmentService: {
        getExchangeRatesURL: () => "https://example.test/latest",
      } as EnvironmentService,
      firestoreService: {readRange} as unknown as
        FirestoreService<ExchangeRateSuccessResponse>,
    });
    const dateRange = {
      startDate: new Date("2026-08-01T00:00:00.000Z"),
      endDate: new Date("2026-08-31T00:00:00.000Z"),
    };

    await expect(service.getHistoricalExchangeRates(dateRange))
      .resolves.toEqual([]);

    expect(readRange).toHaveBeenCalledWith(
      "date",
      "2026-08-01",
      "2026-08-31"
    );
  });
});
