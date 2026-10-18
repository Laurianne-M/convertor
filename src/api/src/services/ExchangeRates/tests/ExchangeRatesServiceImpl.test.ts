import {describe, expect, test, vi} from "vitest";
import {TestData} from "../../../models/testing/TestData.js";
import ExchangeRatesServiceImpl from "../ExchangeRatesServiceImpl.js";
import type {ExchangeRateSuccessResponse} from
  "../../../models/ExchangeRateSuccessResponse.js";
import type EnvironmentService from "../../Environment/EnvironmentService.js";
import type FirestoreService from "../../Firestore/FirestoreService.js";

describe("ExchangeRatesServiceImpl", () => {
  test("fetches and stores successful rates under their date", async () => {
    const successData = TestData.responses.success as
      ExchangeRateSuccessResponse;
    const fetch = vi.fn().mockResolvedValue(
      Response.json(successData, {status: 200})
    );
    const create = vi.fn().mockResolvedValue(successData.date);
    const service = new ExchangeRatesServiceImpl({
      fetch,
      environmentService: {
        getExchangeRatesURL: () => "https://example.test/latest",
      } as EnvironmentService,
      firestoreService: {create} as unknown as FirestoreService,
    });

    await expect(service.fetchAndStoreExchangeRates())
      .resolves.toEqual(successData);

    expect(fetch).toHaveBeenCalledWith("https://example.test/latest");
    expect(create).toHaveBeenCalledWith(
      "exchangeRates",
      successData,
      successData.date
    );
  });

  test("does not store an unsuccessful exchange-rate response", async () => {
    const fetch = vi.fn().mockResolvedValue(
      Response.json(TestData.responses.unauthorized, {status: 401})
    );
    const create = vi.fn();
    const service = new ExchangeRatesServiceImpl({
      fetch,
      environmentService: {
        getExchangeRatesURL: () => "https://example.test/latest",
      } as EnvironmentService,
      firestoreService: {create} as unknown as FirestoreService,
    });

    await expect(service.fetchAndStoreExchangeRates())
      .rejects.toThrow("Could not fetch exchange rates successfully");
    expect(create).not.toHaveBeenCalled();
  });
});
