import {beforeEach, describe, expect, test, vi} from "vitest";
import request from "supertest";
import routes from "../routes.js";
import {TestData} from "../../models/testing/TestData.js";

describe("Firestore-backed exchange-rate routes", () => {
  const read = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    read.mockResolvedValue(TestData.responses.success);
    routes.locals.firestoreService = {read};
  });

  test("returns rates for a date in the path", async () => {
    const response = await request(routes).get("/v2/daily/2026-08-19");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(TestData.responses.success);
    expect(read).toHaveBeenCalledWith("exchangeRates", "2026-08-19");
  });

  test("returns rates for a date in the query string", async () => {
    const response = await request(routes)
      .get("/v2/daily")
      .query({date: "2026-08-19"});

    expect(response.status).toBe(200);
    expect(read).toHaveBeenCalledWith("exchangeRates", "2026-08-19");
  });

  test("uses the current UTC date for /v2/latest", async () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const response = await request(routes).get("/v2/latest");

    expect(response.status).toBe(200);
    expect(read).toHaveBeenCalledWith("exchangeRates", currentDate);
  });

  test("returns 404 when no rates exist for the requested date", async () => {
    read.mockResolvedValue(undefined);

    const response = await request(routes).get("/v2/daily/2026-08-19");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      error: "Exchange rates not found for 2026-08-19",
    });
  });
});
