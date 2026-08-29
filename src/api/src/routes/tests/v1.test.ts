import {describe, test, expect, beforeEach} from "vitest";
import {TestData} from "../../models/testing/TestData.js";
import request from "supertest";
import routes from "../routes.js";
import {ExchangeRatesServiceFake} from "../../services/ExchangeRates/ExchangeRatesServiceFake.js";

describe("/v1/latest", () => {
  let fakeRatesService: ExchangeRatesServiceFake;

  beforeEach(() => {
    // Instantiate a fresh fake service for every test
    fakeRatesService = new ExchangeRatesServiceFake();

    // Inject the fake service into express router/app locals
    routes.locals.exchangeRatesService = fakeRatesService;
  });

  test("should return 200 with rates data when fetch succeed", async () => {
    // Uses default TestData.responses.success and 200 status automatically
    const response = await request(routes).get("/v1/latest");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(TestData.responses.success);
  });

  test("should return 500 when fetch fails with server error", async () => {
    fakeRatesService.data = TestData.responses.internalError;
    fakeRatesService.status = 500;

    const response = await request(routes).get("/v1/latest");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(TestData.responses.internalError);
  });

  test("should return 401 when API key is invalid", async () => {
    fakeRatesService.data = TestData.responses.unauthorized;
    fakeRatesService.status = 401;

    const response = await request(routes).get("/v1/latest");

    expect(response.status).toBe(401);
    expect(response.body).toEqual(TestData.responses.unauthorized);
  });

  test("should return 400 when parameter is missing", async () => {
    fakeRatesService.data = TestData.responses.missingParameter;
    fakeRatesService.status = 400;

    const response = await request(routes).get("/v1/latest");

    expect(response.status).toBe(400);
    expect(response.body).toEqual(TestData.responses.missingParameter);
  });

  test("should delegate unhandled errors to catchAll middleware", async () => {
    fakeRatesService.error = new Error("Network Error");

    const response = await request(routes).get("/v1/latest");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(TestData.responses.internalError);
  });
});
