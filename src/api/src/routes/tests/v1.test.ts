import {describe, test, expect, beforeEach} from "vitest";
import {TestData} from "../../models/testing/TestData.js";
import request from "supertest";
import routes from "../routes.js";
import ExchangeRatesServiceImpl from "../../services/ExchangeRates/ExchangeRatesServiceImpl.js";

describe("/v1/latest", () => {
  let environmentService: { getExchangeRatesURL: () => string };

  beforeEach(() => {
    environmentService = {
      getExchangeRatesURL: () => {
        return "https://api.exchangeratesapi.io/v1/latest?access_key=test"
      }
    };
  });

  test("should return 200 with rates data when fetch succeed", async () => {
    const FetchFn = TestData.makeFetch(TestData.responses.success, 200);
    routes.locals.exchangeRatesService = new ExchangeRatesServiceImpl({
      fetch: FetchFn,
      environmentService
    });

    const response = await request(routes).get("/v1/latest");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(TestData.responses.success);
  });

  test("should return 500 when fetch fails with server error", async () => {
    const FetchFn = TestData.makeFetch(TestData.responses.internalError, 500);
    routes.locals.exchangeRatesService = new ExchangeRatesServiceImpl({
      fetch: FetchFn,
      environmentService
    });

    const response = await request(routes).get("/v1/latest");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(TestData.responses.internalError);
  });

  test("should return 401 when API key is invalid", async () => {
    const FetchFn = TestData.makeFetch(TestData.responses.unauthorized, 401);
    routes.locals.exchangeRatesService = new ExchangeRatesServiceImpl({
      fetch: FetchFn,
      environmentService
    });

    const response = await request(routes).get("/v1/latest");

    expect(response.status).toBe(401);
    expect(response.body).toEqual(TestData.responses.unauthorized);
  });

  test("should return 400 when parameter is missing", async () => {
    const FetchFn = TestData.makeFetch(
      TestData.responses.missingParameter,
      400
    );
    routes.locals.exchangeRatesService = new ExchangeRatesServiceImpl({
      fetch: FetchFn,
      environmentService
    });

    const response = await request(routes).get("/v1/latest");

    expect(response.status).toBe(400);
    expect(response.body).toEqual(TestData.responses.missingParameter);
  });

  test("should delegate unhandled errors to catchAll middleware", async () => {
    const failingFetch = async (): Promise<Response> => {
      throw new Error("Network Error");
    };
    routes.locals.exchangeRatesService = new ExchangeRatesServiceImpl({
      fetch: failingFetch as typeof fetch,
      environmentService
    });

    const response = await request(routes).get("/v1/latest");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(TestData.responses.internalError);
  });
});
