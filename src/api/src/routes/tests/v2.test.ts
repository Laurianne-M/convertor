import {beforeEach, describe, expect, test, vi} from "vitest";
import request from "supertest";
import routes from "../routes.js";
import {TestData} from "../../models/testing/TestData.js";
import {HTTPStatusCode} from "../../models/HTTP.js";

describe("Firestore-backed exchange-rate routes", () => {
  const read = vi.fn();
  const getHistoricalExchangeRates = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    read.mockResolvedValue(TestData.responses.success);
    getHistoricalExchangeRates.mockResolvedValue([TestData.responses.success]);
    routes.locals.firestoreService = {read};
    routes.locals.exchangeRatesService = {
      ...routes.locals.exchangeRatesService,
      getHistoricalExchangeRates,
    };
  });

  test("returns rates for a date in the path", async () => {
    const response = await request(routes).get("/v2/daily/2026-08-19");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(TestData.responses.success);
    expect(read).toHaveBeenCalledWith("2026-08-19");
  });

  test("returns rates for a date in the query string", async () => {
    const response = await request(routes)
      .get("/v2/daily")
      .query({date: "2026-08-19"});

    expect(response.status).toBe(200);
    expect(read).toHaveBeenCalledWith("2026-08-19");
  });

  test("uses the current UTC date for /v2/latest", async () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const response = await request(routes).get("/v2/latest");

    expect(response.status).toBe(200);
    expect(read).toHaveBeenCalledWith(currentDate);
  });

  test("returns 404 when no rates exist for the requested date", async () => {
    read.mockResolvedValue(undefined);

    const response = await request(routes).get("/v2/daily/2026-08-19");

    expect(response.status).toBe(HTTPStatusCode.NOT_FOUND);
    expect(response.body).toEqual({
      success: false,
      error: "Exchange rates not found for 2026-08-19",
    });
  });

  test("parses and delegates historical date parameters", async () => {
    const response = await request(routes)
      .get("/v2/historical")
      .query({startDate: "2026-08-01", endDate: "2026-08-31"});

    expect(response.status).toBe(HTTPStatusCode.SUCCESS);
    expect(response.body).toEqual([TestData.responses.success]);
    expect(getHistoricalExchangeRates).toHaveBeenCalledWith({
      startDate: new Date("2026-08-01T00:00:00.000Z"),
      endDate: new Date("2026-08-31T00:00:00.000Z"),
    });
  });

  test("rejects invalid historical dates before delegation", async () => {
    const response = await request(routes)
      .get("/v2/historical")
      .query({startDate: "2026-02-30", endDate: "2026-03-01"});

    expect(response.status).toBe(HTTPStatusCode.BAD_REQUEST);
    expect(getHistoricalExchangeRates).not.toHaveBeenCalled();
  });
});
